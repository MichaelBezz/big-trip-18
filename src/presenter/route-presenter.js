/** @typedef {import('../adapter/point-adapter').default} PointAdapter */
/** @typedef {import('../model/route-model').default} RouteModel */

// TODO удалить или переработать

import RouteView from '../view/route-view.js';
import PointView from '../view/point-view.js';

import FilterPlaceholder from '../enum/filter-placeholder.js';
import Sort from '../enum/sort.js';
import SortLabel from '../enum/sort-label.js';
import SortDisabled from '../enum/sort-disabled.js';
import {formatDate, formatTime, formatNumber} from '../utils.js';

/** Презентор маршрута */
export default class RoutePresenter {
  /** @type {RouteModel} */
  #model = null;

  /** @type {RouteView} */
  #view = null;

  /** @type {PointAdapter[]} */
  #points = null;

  /**
   * @param {RouteModel} model
   */
  constructor(model) {
    this.#model = model;
    this.#view = document.querySelector(String(RouteView));
    this.#points = this.#model.getPoints();

    if (!this.#points && this.#points.length) {
      this.#view.showPlaceholder(FilterPlaceholder.EVERYTHING);

      return;
    }

    this.#view
      .hidePlaceholder()
      .setPoints(...this.#points.map(this.createPointView, this));

    this.#view.sortSelectView
      .setOptions(this.createSortStates())
      .setOptionsDisabled(Object.values(SortDisabled))
      .setValue(Sort.DAY);
  }

  /**
   * Создаст точку на маршруте
   * @param {PointAdapter} point
   */
  createPointView(point) {
    const pointView = new PointView(point.id);

    const destination = this.#model.getDestinationById(point.destinationId);
    const selectedOffers = this.#model.getSelectedOffers(point.type, point.offerIds);

    /** @type {PointOfferState[]} */
    const selectedOfferStates = selectedOffers.map((offer) => [offer.title, offer.price]);

    pointView
      .setDate(point.startDate, formatDate(point.startDate))
      .setIcon(point.type)
      .setTitle(`${point.type} ${destination.name}`)
      .setStartTime(point.startDate, formatTime(point.startDate))
      .setEndTime(point.endDate, formatTime(point.endDate))
      .setPrice(formatNumber(point.basePrice))
      .setOffers(selectedOfferStates);

    return pointView;
  }

  /**
   * Создаст состояния для сортировки
   * @return {SortOptionState[]}
   */
  createSortStates() {
    return Object.keys(Sort).map((key) => [SortLabel[key], Sort[key]]);
  }
}
