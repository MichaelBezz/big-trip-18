import Presenter from './presenter.js';

import Mode from '../enum/mode.js';
import SortType from '../enum/sort-type.js';
import SortLabel from '../enum/sort-label.js';
import SortDisabledOption from '../enum/sort-disabled-option.js';
import SortCompare from '../enum/sort-compare.js';

/**
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

    this.buildView();

    this.model.pointsModel.addEventListener(['add', 'remove', 'filter'], this.onPointsModelChange.bind(this));

    this.view.addEventListener('change', this.onViewChange.bind(this));
  }

  buildView() {
    /** @type {SortOptionState[]} */
    const optionStates = Object.keys(SortType).map((key) => [SortLabel[key], SortType[key]]);

    this.view
      .setOptions(optionStates)
      .setOptionsDisabled(Object.values(SortDisabledOption));

    this.updateViewValue();
    this.updateViewDisplay();
  }

  updateViewValue() {
    const compare = this.model.pointsModel.getSort();
    const type = SortType[SortCompare.findKey(compare)];

    this.view.setValue(type);
  }

  updateViewDisplay() {
    const flag = Boolean(this.model.pointsModel.list().length);

    this.view.display(flag);
  }

  /**
   * @param {CustomEvent} event
   */
  onPointsModelChange(event) {
    if (event.type === 'filter') {
      this.model.pointsModel.setSort(SortCompare.DAY, false);

      this.updateViewValue();
    }

    this.updateViewDisplay();
  }

  onViewChange() {
    const value = this.view.getValue();
    const compare = SortCompare[SortType.findKey(value)];

    this.model.setMode(Mode.VIEW);
    this.model.pointsModel.setSort(compare);
  }
}
