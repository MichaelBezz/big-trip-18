/** @typedef {import('../model/route-model').default} RouteModel */
/** @typedef {import('../adapter/point-adapter').default} PointAdapter */

import Filter from '../enum/filter.js';
import FilterLabel from '../enum/filter-label.js';
import FilterPredicate from '../enum/filter-predicate.js';

import FilterSelectView from '../view/filter-select-view.js';

/** Презентор фильтра */
export default class FilterPresenter {
  #model = null;
  #view = null;

  /**
   * @param {RouteModel} model
   */
  constructor(model) {
    /** @type {RouteModel} */
    this.#model = model;

    /** @type {FilterSelectView} */
    this.#view = new FilterSelectView();

    /** @type {PointAdapter[]} */
    this.points = this.#model.getPoints();

    /** @type {HTMLElement} */
    this.container = document.querySelector('.trip-controls__filters');

    this.#view
      .setOptions(
        Object.keys(Filter).map((key) => [FilterLabel[key], Filter[key]])
      )
      .setOptionsDisabled(
        Object.keys(Filter).map((key) => !this.points.filter(FilterPredicate[key]).length)
      )
      .select(Filter.EVERYTHING);

    this.container.append(this.#view);
  }
}
