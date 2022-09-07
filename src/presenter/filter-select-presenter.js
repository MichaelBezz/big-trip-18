import Presenter from './presenter.js';

import Filter from '../enum/filter.js';
import FilterLabel from '../enum/filter-label.js';
import FilterPredicate from '../enum/filter-predicate.js';

/**
 * Презентор фильтра
 * @template {ApplicationModel} Model
 * @template {FilterSelectView} View
 * @extends Presenter<Model,View>
 */
export default class FilterSelectPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.buildFilterSelectView();

    this.view.addEventListener('filter-change', this.onFilterChange.bind(this));
  }

  buildFilterSelectView() {
    /** @type {FilterOptionState[]} */
    const optionStates = Object.keys(Filter).map((key) => [FilterLabel[key], Filter[key]]);
    const optionsDisabled = Object.keys(Filter).map((key) => !this.model.points.list().filter(FilterPredicate[key]).length);

    this.view
      .setOptions(optionStates)
      .setOptionsDisabled(optionsDisabled)
      .setValue(Filter.EVERYTHING);
  }

  onFilterChange() {
    const checkedFilter = Filter.findKey(this.view.getValue());
    const filterPredicate = FilterPredicate[checkedFilter];

    this.model.points.setFilter(filterPredicate);
  }
}
