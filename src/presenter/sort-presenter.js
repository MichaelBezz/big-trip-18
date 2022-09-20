import Presenter from './presenter.js';

import Mode from '../enum/mode.js';
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

    this.model.addEventListener('mode', this.onModelChange.bind(this));
    this.model.pointsModel.addEventListener(['add', 'update', 'remove'], this.onPointsModelChange.bind(this));
    this.model.pointsModel.addEventListener('filter', this.onPointsModelFilter.bind(this));
    this.view.addEventListener('change', this.onViewChange.bind(this));
  }

  setViewHidden() {
    const flag = Boolean(!this.model.pointsModel.list().length);
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
   */
  onModelChange() {
    const flags = this.getOptionsDisabled();

    if (this.model.getMode() !== Mode.VIEW) {
      flags.fill(true);
    }

    this.view.setOptionsDisabled(flags);
  }

  /** Скроет сортировку, если нет точек */
  onPointsModelChange() {
    this.setViewHidden();
  }

  /** Сбросит сортировку на тип DAY */
  onPointsModelFilter() {
    this.view.setValue(SortType.DAY);
    this.model.pointsModel.setSort(SortCompare.DAY);
  }

  /** Сортирует список с точками */
  onViewChange() {
    const checkedSort = SortType.findKey(this.view.getValue());
    const sortCompare = SortCompare[checkedSort];

    this.model.pointsModel.setSort(sortCompare);
  }
}
