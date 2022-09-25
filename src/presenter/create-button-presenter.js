import Presenter from './presenter.js';

import Mode from '../enum/mode.js';

/**
 * @template {ApplicationModel} Model
 * @template {HTMLButtonElement} View
 * @extends Presenter<Model,View>
 */
export default class CreateButtonPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.model.addEventListener('mode', this.onModelMode.bind(this));
    this.view.addEventListener('click', this.onViewClick.bind(this));
  }

  onModelMode() {
    this.view.disabled = this.model.getMode() === Mode.CREATE;
  }

  onViewClick() {
    this.model.setMode(Mode.CREATE);
  }
}
