import Presenter from './presenter.js';

import Mode from '../enum/mode.js';
import {formatDate, formatTime} from '../utils.js';

/**
 * Презентор списка точек
 * @template {ApplicationModel} Model
 * @template {ListView} View
 * @extends {Presenter<Model,View>}
 */
export default class ListPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.updateView();

    this.model.points.addEventListener(
      ['add', 'update', 'remove', 'filter', 'sort'],
      this.onModelPointsChange.bind(this)
    );

    this.view.addEventListener('point-edit', this.onViewPointEdit.bind(this));
  }

  updateView() {
    const points = this.model.points.list();

    /** @type {PointState[]} */
    const states = points.map((point) => {
      const {id, type, destinationId, startDate, endDate, basePrice, offerIds} = point;

      const destination = this.model.destinations.findById(destinationId);
      const offerGroup = this.model.offerGroups.findById(type);

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
        date: formatDate(startDate),
        startTime: formatTime(startDate),
        endTime: formatTime(endDate),
        icon: type,
        title: compositeTitle,
        price: basePrice,
        offers: offerStates
      };
    });

    this.view.setPoints(states);
  }

  onModelPointsChange() {
    this.updateView();
  }

  /**
   * @param {CustomEvent} event
   */
  onViewPointEdit(event) {
    this.model.setMode(Mode.EDIT, event.detail);
  }
}
