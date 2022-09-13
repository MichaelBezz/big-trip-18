import Presenter from './presenter.js';

/**
 * Презентор формы создания
 * @template {ApplicationModel} Model
 * @template {PointCreatorView} View
 * @extends {Presenter<Model,View>}
 */
export default class PointCreatorPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);
  }
}
