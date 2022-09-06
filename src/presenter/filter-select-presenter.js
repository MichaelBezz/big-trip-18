/** @typedef {import('../model/route-model').default} RouteModel */
/** @typedef {import('../adapter/point-adapter').default} PointAdapter */

import FilterSelectView from '../view/filter-select-view.js';

import Filter from '../enum/filter.js';
import FilterLabel from '../enum/filter-label.js';
import FilterCallback from '../enum/filter-callback.js';

/** Презентор фильтра */
export default class FilterSelectPresenter {
  /** @type {RouteModel} */
  #model = null;

  /** @type {FilterSelectView} */
  #view = null;

  /** @type {PointAdapter[]} */
  #points = null;

  /** @type {HTMLElement} */
  #container = null;

  /**
   * @param {RouteModel} model
   */
  constructor(model) {
    this.#model = model;
    this.#view = new FilterSelectView();
    this.#points = this.#model.getPoints();
    this.#container = document.querySelector('.trip-controls__filters');

    this.#view
      .setOptions(
        Object.keys(Filter).map((key) => [FilterLabel[key], Filter[key]])
      )
      .setOptionsDisabled(
        Object.keys(Filter).map((key) => !this.#points.filter(FilterCallback[key]).length)
      )
      .setValue(Filter.EVERYTHING);

    this.#container.append(this.#view);
  }
}
