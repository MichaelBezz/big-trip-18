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

    this.buildSortSelectView();

    this.model.points.addEventListener(
      ['add', 'update', 'remove', 'filter'],
      this.updateSortSelectView.bind(this)
    );

    this.view.addEventListener('change', this.onSortSelectChange.bind(this));
  }

  buildSortSelectView() {
    /** @type {SortOptionState[]} */
    const optionStates = Object.keys(Sort).map((key) => [SortLabel[key], Sort[key]]);

    this.view
      .setOptions(optionStates)
      .setValue(Sort.DAY);

    this.disableSortOptions();
  }

  updateSortSelectView() {
    this.view.setValue(Sort.DAY);
    this.disableSortOptions();
  }

  disableSortOptions() {
    const optionsDisabled = Object.values(SortDisabled);

    this.view.setOptionsDisabled(optionsDisabled);
  }

  onSortSelectChange() {
    const checkedSort = Sort.findKey(this.view.getValue());
    const sortCompare = SortCompare[checkedSort];

    this.model.points.setSort(sortCompare);
  }
}
