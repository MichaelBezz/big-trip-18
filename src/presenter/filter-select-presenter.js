import Presenter from './presenter.js';

import Filter from '../enum/filter.js';
import FilterLabel from '../enum/filter-label.js';
import FilterPredicate from '../enum/filter-predicate.js';

/**
 * Презентор фильтра
 * @template {ApplicationModel} Model
 * @template {FilterSelectView} View
 * @extends {Presenter<Model,View>}
 */
export default class FilterSelectPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.buildFilterSelect();

    this.model.addEventListener(
      ['view', 'create', 'edit'],
      this.onFilterSelectDisable.bind(this)
    );

    this.model.points.addEventListener(
      ['add', 'update', 'remove', 'sort'],
      this.onFilterSelectUpdate.bind(this)
    );

    this.view.addEventListener('change', this.onFilterSelectChange.bind(this));
  }

  getOptionsDisabled() {
    return Object.values(FilterPredicate).map((predicate) =>
      !this.model.points.list(predicate).length
    );
  }

  buildFilterSelect() {
    /** @type {FilterOptionState[]} */
    const optionStates = Object.keys(Filter).map((key) => [FilterLabel[key], Filter[key]]);

    this.view
      .setOptions(optionStates)
      .setOptionsDisabled(this.getOptionsDisabled())
      .setValue(Filter.EVERYTHING);
  }

  /**
   * @param {CustomEvent} event
   */
  onFilterSelectDisable(event) {
    const flags = this.getOptionsDisabled();

    if (event.type !== 'view') {
      flags.fill(true);
    }

    this.view.setOptionsDisabled(flags);
  }

  onFilterSelectUpdate() {
    this.view.setOptionsDisabled(this.getOptionsDisabled());
  }

  onFilterSelectChange() {
    const checkedFilter = Filter.findKey(this.view.getValue());
    const filterPredicate = FilterPredicate[checkedFilter];

    this.model.points.setFilter(filterPredicate);
  }
}
