import Presenter from './presenter.js';

import Sort from '../enum/sort.js';
import SortLabel from '../enum/sort-label.js';
import SortDisabled from '../enum/sort-disabled.js';
import SortCompare from '../enum/sort-compare.js';

/**
 * Презентор сортировки
 * @template {ApplicationModel} Model
 * @template {SortSelectView} View
 * @extends {Presenter<Model,View>}
 */
export default class SortSelectPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.buildSortSelect();

    this.model.addEventListener(
      ['view', 'create', 'edit'],
      this.onSortSelectDisable.bind(this)
    );

    this.model.points.addEventListener('filter', this.onSortSelectUpdate.bind(this));
    this.view.addEventListener('change', this.onSortSelectChange.bind(this));
  }

  getOptionsDisabled() {
    return Object.values(SortDisabled);
  }

  buildSortSelect() {
    /** @type {SortOptionState[]} */
    const optionStates = Object.keys(Sort).map((key) => [SortLabel[key], Sort[key]]);

    this.view
      .setOptions(optionStates)
      .setOptionsDisabled(this.getOptionsDisabled())
      .setValue(Sort.DAY);
  }

  /**
   * @param {CustomEvent} event
   */
  onSortSelectDisable(event) {
    const flags = this.getOptionsDisabled();

    if (event.type !== 'view') {
      flags.fill(true);
    }

    this.view.setOptionsDisabled(flags);
  }

  onSortSelectUpdate() {
    this.view.setValue(Sort.DAY);
    this.model.points.setSort(SortCompare[Sort.DAY]);
  }

  onSortSelectChange() {
    const checkedSort = Sort.findKey(this.view.getValue());
    const sortCompare = SortCompare[checkedSort];

    this.model.points.setSort(sortCompare);
  }
}
