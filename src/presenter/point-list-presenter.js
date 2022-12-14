import {escape} from 'he';

import Presenter from './presenter.js';

import {formatDate, formatTime, formatNumber} from '../format.js';
import Mode from '../enum/mode.js';

/**
 * @template {ApplicationModel} Model
 * @template {PointListView} View
 * @extends {Presenter<Model,View>}
 */
export default class PointListPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.updateView();

    this.model.pointsModel.addEventListener(
      ['add', 'update', 'remove', 'filter', 'sort'],
      this.onPointsModelChange.bind(this)
    );

    this.view.addEventListener('edit', this.onViewEdit.bind(this));
  }

  updateView(revealId = '') {
    const points = this.model.pointsModel.list();

    /** @type {PointState[]} */
    const states = points.map((point, index) => {
      const {id, type, destinationId, startDate, endDate, basePrice, offerIds} = point;

      const destination = this.model.destinationsModel.findById(destinationId);
      const offerGroup = this.model.offerGroupsModel.findById(type);

      const title = `${type} ${destination.name}`;

      /** @type {PointOfferState[]} */
      const offerStates = offerGroup.items.reduce((result, offer) => {
        if (offerIds.includes(offer.id)) {
          result.push([escape(offer.title), escape(formatNumber(offer.price))]);
        }
        return result;
      }, []);

      if (revealId) {
        index = (revealId === point.id) ? 0 : null;
      }

      return {
        id: escape(id),
        index,
        startIsoDate: escape(startDate),
        endIsoDate: escape(endDate),
        date: formatDate(startDate),
        startTime: formatTime(startDate),
        endTime: formatTime(endDate),
        icon: escape(type),
        title: escape(title),
        price: escape(formatNumber(basePrice)),
        offers: offerStates
      };
    });

    this.view.setPoints(states);
  }

  /**
   * @param {CustomEvent<PointAdapter> & CustomEvent<[newItem: PointAdapter, oldItem: PointAdapter]>} event
   */
  onPointsModelChange(event) {
    if (event.type === 'add') {
      this.updateView(event.detail.id);

      return;
    }

    if (event.type === 'update') {
      const [point] = event.detail;

      this.updateView(point.id);

      return;
    }

    if (event.type === 'remove') {
      this.view.findById(event.detail.id).remove();

      return;
    }

    this.updateView();
  }

  /**
   * @param {CustomEvent & {target: PointView}} event
   */
  onViewEdit(event) {
    this.model.setMode(Mode.EDIT, event.target.getId());
  }
}
