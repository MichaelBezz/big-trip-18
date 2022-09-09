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

    this.buildFilterSelectView();

    this.model.points.addEventListener(
      ['add', 'update', 'remove', 'sort'],
      this.updateFilterSelectView.bind(this)
    );

    this.view.addEventListener('change', this.onFilterSelectChange.bind(this));
  }

  buildFilterSelectView() {
    /** @type {FilterOptionState[]} */
    const optionStates = Object.keys(Filter).map((key) => [FilterLabel[key], Filter[key]]);

    this.view
      .setOptions(optionStates)
      .setValue(Filter.EVERYTHING);

    this.disableFilterOptions();
  }

  updateFilterSelectView() {
    this.disableFilterOptions();
  }

  disableFilterOptions() {
    const points = this.model.points.list();
    const isDisabled = Object.keys(Filter).map((key) => !points.filter(FilterPredicate[key]).length);

    this.view.setOptionsDisabled(isDisabled);
  }

  onFilterSelectChange() {
    const checkedFilter = Filter.findKey(this.view.getValue());
    const filterPredicate = FilterPredicate[checkedFilter];

    this.model.points.setFilter(filterPredicate);
  }
}
