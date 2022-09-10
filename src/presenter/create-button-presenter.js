import Presenter from './presenter.js';

import Mode from '../enum/mode.js';

/**
 * @template {ApplicationModel} Model
 * @template {CreateButtonView} View
 * @extends Presenter<Model,View>
 */
export default class CreateButtonPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.model.addEventListener(['view', 'create', 'edit'], () => {
      this.view.blockButton(this.model.getMode() === Mode.CREATE);
    });

    this.view.addEventListener('click', () => {
      this.model.setMode(Mode.CREATE);
    });
  }
}
