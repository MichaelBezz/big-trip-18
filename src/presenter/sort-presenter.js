import Presenter from './presenter.js';

import SortType from '../enum/sort-type.js';
import SortLabel from '../enum/sort-label.js';
import SortDisabled from '../enum/sort-disabled.js';
import SortCompare from '../enum/sort-compare.js';

/**
 * Презентор сортировки
 * @template {ApplicationModel} Model
 * @template {SortView} View
 * @extends {Presenter<Model,View>}
 */
export default class SortPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.buildSortSelect();

    this.model.addEventListener(
      ['view', 'create', 'edit'],
      this.onModelChange.bind(this)
    );

    this.model.points.addEventListener(
      ['add', 'update', 'remove'],
      this.onModelPointsChange.bind(this)
    );

    this.model.points.addEventListener('filter', this.onModelPointsFilter.bind(this));
    this.view.addEventListener('change', this.onViewChange.bind(this));
  }

  setViewHidden() {
    const flag = Boolean(!this.model.points.list().length);
    this.view.set('hidden', flag);
  }

  getOptionsDisabled() {
    return Object.values(SortDisabled);
  }

  buildSortSelect() {
    this.setViewHidden();

    /** @type {SortOptionState[]} */
    const optionStates = Object.keys(SortType).map((key) => [SortLabel[key], SortType[key]]);

    this.view
      .setOptions(optionStates)
      .setOptionsDisabled(this.getOptionsDisabled())
      .setValue(SortType.DAY);
  }

  /**
   * Блокирует сортировку, если mode !== view
   * NOTE при create не нужно сбрасывать сортировку
   * @param {CustomEvent} event
   */
  onModelChange(event) {
    const flags = this.getOptionsDisabled();

    if (event.type !== 'view') {
      flags.fill(true);
    }

    this.view.setOptionsDisabled(flags);
  }

  /** Скроет сортировку, если нет точек */
  onModelPointsChange() {
    this.setViewHidden();
  }

  /** Сбросит сортировку на тип DAY */
  onModelPointsFilter() {
    this.view.setValue(SortType.DAY);
    this.model.points.setSort(SortCompare.DAY);
  }

  /** Сортирует список с точками */
  onViewChange() {
    const checkedSort = SortType.findKey(this.view.getValue());
    const sortCompare = SortCompare[checkedSort];

    this.model.points.setSort(sortCompare);
  }
}
