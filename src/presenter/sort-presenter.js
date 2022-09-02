/** @typedef {import('../adapter/point-adapter').default} PointAdapter */
/** @typedef {import('../model/route-model').default} RouteModel */

// import RouteView from '../view/route-view.js';
import SortSelectView from '../view/sort-select-view';

import Sort from '../enum/sort.js';
import SortLabel from '../enum/sort-label.js';
import SortDisabled from '../enum/sort-disabled.js';

/** Презентор сортировки */
export default class SortPresenter {
  /** @type {RouteModel} */
  #model = null;

  /** @type {SortSelectView} */
  #view = null;

  // /** @type {RouteView} */
  // #container = null;

  /**
   * @param {RouteModel} model
   */
  constructor(model) {
    this.#model = model;
    this.#view = new SortSelectView();
    // this.#container = document.querySelector(String(RouteView));

    this.#view
      .setOptions(
        Object.keys(Sort).map((key) => [SortLabel[key], Sort[key]])
      )
      .setOptionsDisabled(
        Object.values(SortDisabled)
      )
      .setValue(Sort.DAY);

    // this.#container.append(this.#view);
  }
}
