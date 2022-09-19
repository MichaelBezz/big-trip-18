import Presenter from './presenter.js';

import Mode from '../enum/mode.js';
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

    this.model.addEventListener('mode', this.onModelChange.bind(this));
    this.model.points.addEventListener(['add', 'update', 'remove'], this.onModelPointsChange.bind(this));
    this.view.addEventListener('change', this.onViewChange.bind(this));
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

  onModelChange() {
    const flags = this.getOptionsDisabled();
    const isPointsExist = this.model.points.list().length;

    if (this.model.getMode() === Mode.CREATE && isPointsExist) {
      this.view.setValue(FilterType.EVERYTHING);
      this.model.points.setFilter(FilterPredicate.EVERYTHING);
    }

    if (this.model.getMode() !== Mode.VIEW) {
      flags.fill(true);
    }

    this.view.setOptionsDisabled(flags);
  }

  onModelPointsChange() {
    this.view.setOptionsDisabled(this.getOptionsDisabled());
  }

  onViewChange() {
    const checkedFilter = FilterType.findKey(this.view.getValue());
    const filterPredicate = FilterPredicate[checkedFilter];

    this.model.points.setFilter(filterPredicate);
  }
}
