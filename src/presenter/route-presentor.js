/** @typedef {import('../model/route-model').default} RouteModel */

import Message from '../enum/message.js';
import {formatDate, formatTime} from '../utils.js';

import RouteView from '../view/route-view.js';
import PointView from '../view/point-view.js';
import EditorPresenter from './editor-presentor.js';

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

    /** @type {EditorPresenter} */
    this.editorPresenter = new EditorPresenter(this.#model);

    this.#model.ready().then(() => {
      const points = this.#model.getPoints();

      if (!points && points.length) {
        this.#view.showMessage(Message.EVERTHING);

        return;
      }

      this.#view
        .hideMessage()
        .setPoints(...points.map(this.createPointView, this));
    });
  }

  /**
   * Создаст точку на маршруте
   * @param {AdaptedPoint} point
   */
  createPointView(point) {
    const pointView = new PointView();

    const destination = this.#model.getDestinationById(point.destinationId);
    const compositeTitle = `${point.type} ${destination.name}`;

    const offers = this.#model.getSelectedOffers(point.type, point.offerIds);
    const selectedOfferStates = offers.map((offer) => {
      const {title, price} = offer;

      return [title, price];
    });

    pointView.offerListView
      .setOffers(selectedOfferStates);

    pointView
      .setDate(point.startDate, formatDate(point.startDate))
      .setIcon(point.type)
      .setTitle(compositeTitle)
      .setStartTime(point.startDate, formatTime(point.startDate))
      .setEndTime(point.endDate, formatTime(point.endDate))
      .setPrice(point.basePrice);

    pointView.addEventListener(':expand', () => {
      this.editorPresenter.init(point, pointView);
    });

    return pointView;
  }
}
