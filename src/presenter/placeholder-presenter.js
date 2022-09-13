import Presenter from './presenter.js';

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

    this.model.points.addEventListener(
      ['add', 'remove'],
      this.onModelPointsChange.bind(this)
    );
  }

  updateView() {
    const {length} = this.model.points.list();
    const key = FilterPredicate.findKey(this.model.points.getFilter());

    this.view.textContent = length ? '' : Placeholder[key];
    this.view.hidden = Boolean(length);
  }

  onModelPointsChange() {
    this.updateView();
  }
}
