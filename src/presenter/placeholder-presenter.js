import Presenter from './presenter.js';

/**
 * @template {ApplicationModel} Model
 * @template {PlaceholderView} View
 * @extends {Presenter<Model,View>}
 */
export default class PlaceholderPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);
  }
}
