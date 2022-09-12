import Presenter from './presenter.js';

import FilterType from '../enum/filter-type.js';
import FilterLabel from '../enum/filter-label.js';
import FilterPredicate from '../enum/filter-predicate.js';

/**
 * Презентор фильтра
 * @template {ApplicationModel} Model
 * @template {FilterView} View
 * @extends {Presenter<Model,View>}
 */
export default class FilterPresenter extends Presenter {
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
    const optionStates = Object.keys(FilterType).map((key) => [FilterLabel[key], FilterType[key]]);

    this.view
      .setOptions(optionStates)
      .setOptionsDisabled(this.getOptionsDisabled())
      .setValue(FilterType.EVERYTHING);
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
    const checkedFilter = FilterType.findKey(this.view.getValue());
    const filterPredicate = FilterPredicate[checkedFilter];

    this.model.points.setFilter(filterPredicate);
  }
}
