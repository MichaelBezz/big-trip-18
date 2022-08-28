/** @typedef {import('../model/route-model').default} RouteModel */

import PointEditorView from '../view/point-editor-view.js';

/** Презентор формы редактирования */
export default class EditorPresenter {
  #model = null;
  #view = null;

  /**
   * @param {RouteModel} model
   */
  constructor(model) {
    /** @type {RouteModel} */
    this.#model = model;

    /** @type {PointEditorView} */
    this.#view = new PointEditorView();

    this.#model.ready().then(() => {
      // const points = this.#model.getPoints();
    });
  }
}
