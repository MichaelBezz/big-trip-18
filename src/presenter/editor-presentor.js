/** @typedef {import('../model/route-model').default} RouteModel */

/** Презентор формы редактирования */
export default class EditorPresenter {
  #model = null;

  /**
   * @param {RouteModel} model
   */
  constructor(model) {
    this.#model = model;
  }
}
