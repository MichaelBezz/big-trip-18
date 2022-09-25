import Presenter from './presenter.js';

import Mode from '../enum/mode.js';
import FilterType from '../enum/filter-type.js';
import FilterLabel from '../enum/filter-label.js';
import FilterPredicate from '../enum/filter-predicate.js';

/**
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

    this.buildView();

    this.model.addEventListener('mode', this.onModelMode.bind(this));
    this.model.pointsModel.addEventListener(['add', 'update', 'remove'], this.onPointsModelChange.bind(this));

    this.view.addEventListener('change', this.onViewChange.bind(this));
  }

  buildView() {
    /** @type {FilterOptionState[]} */
    const optionStates = Object.keys(FilterType).map((key) => [FilterLabel[key], FilterType[key]]);

    this.view.setOptions(optionStates);

    this.updateViewValue();
    this.updateViewOptionsDisabled();
  }

  updateViewValue() {
    const predicate = this.model.pointsModel.getFilter();
    const type = FilterType[FilterPredicate.findKey(predicate)];

    this.view.setValue(type);
  }

  updateViewOptionsDisabled() {
    const predicates = Object.values(FilterPredicate);
    const states = predicates.map((predicate) => !this.model.pointsModel.list(predicate).length);

    this.view.setOptionsDisabled(states);
  }

  onModelMode() {
    if (this.model.getMode() === Mode.CREATE) {
      this.model.pointsModel.setFilter(FilterPredicate.EVERYTHING);

      this.updateViewValue();
    }
  }

  onPointsModelChange() {
    this.updateViewOptionsDisabled();
  }

  onViewChange() {
    const value = this.view.getValue();
    const predicate = FilterPredicate[FilterType.findKey(value)];

    this.model.setMode(Mode.VIEW);
    this.model.pointsModel.setFilter(predicate);
  }
}
