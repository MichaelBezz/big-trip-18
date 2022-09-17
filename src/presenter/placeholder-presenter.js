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

    this.model.addEventListener(
      ['view', 'create', 'edit'],
      this.onModelCreate.bind(this)
    );

    this.model.points.addEventListener(
      ['add', 'remove', 'filter'],
      this.onModelPointsChange.bind(this)
    );
  }

  updateView() {
    const {length} = this.model.points.list();
    const key = FilterPredicate.findKey(this.model.points.getFilter());

    this.view.textContent = length ? '' : Placeholder[key];
    this.view.hidden = Boolean(length);
  }

  /**
   * @param {CustomEvent} event
   */
  onModelCreate(event) {
    const isPointsExist = this.model.points.list().length;

    if (event.type === 'create' && !isPointsExist) {
      this.view.hidden = true;
    }

    if (event.type !== 'create' && !isPointsExist) {
      this.view.hidden = false;
    }
  }

  onModelPointsChange() {
    this.updateView();
  }
}
