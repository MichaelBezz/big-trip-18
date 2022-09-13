import Presenter from './presenter.js';

/**
 * Презентор формы создания
 * @template {ApplicationModel} Model
 * @template {CreatorView} View
 * @extends {Presenter<Model,View>}
 */
export default class CreatorPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);
  }
}
