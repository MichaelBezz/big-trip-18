import Presenter from './presenter.js';

import he from 'he';
import {formatDate, formatNumber} from '../format.js';
import Mode from '../enum/mode.js';

const DATE_FORMAT = 'MMM D';
const TIME_FORMAT = 'HH:mm';

/**
 * Презентор списка точек
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

    this.view.addEventListener('point-edit', this.onViewPointEdit.bind(this));
  }

  updateView() {
    const points = this.model.pointsModel.list();

    /** @type {PointState[]} */
    const states = points.map((point) => {
      const {id, type, destinationId, startDate, endDate, basePrice, offerIds} = point;

      const destination = this.model.destinationsModel.findById(destinationId);
      const offerGroup = this.model.offerGroupsModel.findById(type);

      const compositeTitle = `${type} ${destination.name}`;

      /** @type {PointOfferState[]} */
      const offerStates = offerGroup.items.reduce((result, offer) => {
        if (offerIds.includes(offer.id)) {
          result.push([offer.title, offer.price]);
        }
        return result;
      }, []);

      return {
        id,
        startIsoDate: startDate,
        endIsoDate: endDate,
        date: formatDate(startDate, DATE_FORMAT),
        startTime: formatDate(startDate, TIME_FORMAT),
        endTime: formatDate(endDate, TIME_FORMAT),
        icon: type,
        title: compositeTitle,
        price: he.encode(formatNumber(basePrice)),
        offers: offerStates
      };
    });

    this.view.setPoints(states);
  }

  /*
  TODO Реализовать удаление point-view без полной перерисовки списка
    @param {CollectionModelEvent<PointAdapter>} event
    if (event.type === 'remove') {
      this.view.findById(event.detail.id).remove();
      return;
    }
  */

  onPointsModelChange() {
    this.updateView();
  }

  /**
   * @param {CustomEvent & {target: PointView}} event
   */
  onViewPointEdit(event) {
    this.model.setMode(Mode.EDIT, event.target.getId());
  }
}
