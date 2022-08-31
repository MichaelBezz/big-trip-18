/** @typedef {import('../adapter/point-adapter').default} PointAdapter */
/** @typedef {import('../model/route-model').default} RouteModel */

import Message from '../enum/message.js';
import {formatDate, formatTime, formatNumber} from '../utils.js';

import RouteView from '../view/route-view.js';
import PointView from '../view/point-view.js';

/** Презентор маршрута */
export default class RoutePresenter {
  #model = null;
  #view = null;

  /**
   * @param {RouteModel} model
   */
  constructor(model) {
    /** @type {RouteModel} */
    this.#model = model;

    /** @type {RouteView} */
    this.#view = document.querySelector(String(RouteView));

    /** @type {PointAdapter[]} */
    this.points = this.#model.getPoints();

    if (!this.points && this.points.length) {
      this.#view.showMessage(Message.EVERTHING);

      return;
    }

    this.#view
      .hideMessage()
      .setPoints(...this.points.map(this.createPointView, this));
  }

  /**
   * Создаст точку на маршруте
   * @param {PointAdapter} point
   */
  createPointView(point) {
    const pointView = new PointView(point.id);

    const destination = this.#model.getDestinationById(point.destinationId);
    const selectedOffers = this.#model.getSelectedOffers(point.type, point.offerIds);

    /** @type {[string, number][]} */
    const selectedOfferStates = selectedOffers.map((offer) => [offer.title, offer.price]);

    pointView
      .setDate(point.startDate, formatDate(point.startDate))
      .setIcon(point.type)
      .setTitle(`${point.type} ${destination.name}`)
      .setStartTime(point.startDate, formatTime(point.startDate))
      .setEndTime(point.endDate, formatTime(point.endDate))
      .setPrice(formatNumber(point.basePrice));

    pointView.offerListView
      .setOffers(selectedOfferStates);

    return pointView;
  }
}
