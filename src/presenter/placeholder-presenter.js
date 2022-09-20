import Presenter from './presenter.js';

import Mode from '../enum/mode.js';
import Placeholder from '../enum/placeholder.js';
import FilterPredicate from '../enum/filter-predicate.js';

/**
 * @template {ApplicationModel} Model
 * @template {HTMLParagraphElement} View
 * @extends {Presenter<Model,View>}
 */
export default class PlaceholderPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.updateView();

    this.model.addEventListener('mode', this.onModelChange.bind(this));
    this.model.pointsModel.addEventListener(['add', 'remove', 'filter'], this.onPointsModelChange.bind(this));
  }

  updateView() {
    const {length} = this.model.pointsModel.list();
    const isHidden = this.model.getMode() === Mode.CREATE || Boolean(length);

    const key = FilterPredicate.findKey(this.model.pointsModel.getFilter());

    this.view.textContent = isHidden ? '' : Placeholder[key];
    this.view.hidden = isHidden;
  }

  onModelChange() {
    this.updateView();
  }

  onPointsModelChange() {
    this.updateView();
  }
}
