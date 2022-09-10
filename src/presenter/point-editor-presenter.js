import Presenter from './presenter.js';

import Mode from '../enum/mode.js';
import Type from '../enum/type.js';
import TypeLabel from '../enum/type-label.js';
import {formatDateWithTime} from '../utils.js';

/**
 * Презентор формы редактирования
 * @template {ApplicationModel} Model
 * @template {PointEditorView} View
 * @extends {Presenter<Model,View>}
 */
export default class PointEditorPresenter extends Presenter {
  /** @type {PointAdapter}*/
  #point;

  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.buildTypeSelectView();
    this.buildDestinationSelectView();
    this.buildDayDatePickerView();

    this.model.addEventListener('edit', this.onPointEdit.bind(this));
    this.view.addEventListener('reset', this.onPointEditorReset.bind(this));
    this.view.addEventListener('close', () => this.model.setMode(Mode.VIEW));
    this.view.typeSelectView.addEventListener('change', this.onTypeSelectChange.bind(this));
    this.view.destinationSelectView.addEventListener('change', this.onDestinationSelectChange.bind(this));
  }

  buildTypeSelectView() {
    /** @type {TypeOptionState[]} */
    const optionStates = Object.values(Type).map((type) => {
      const key = Type.findKey(type);
      const label = TypeLabel[key];

      return [label, type];
    });

    this.view.typeSelectView.setOptions(optionStates);
  }

  buildDestinationSelectView() {
    const destinationNames = this.model.destinations
      .listAll()
      .map((destination) => destination.name);

    /** @type {DestinationOptionState[]} */
    const optionStates = [...new Set(destinationNames)].map((name) => ['', name]);

    this.view.destinationSelectView.setOptions(optionStates);
  }

  buildDayDatePickerView() {
    this.view.datePickerView.configure({dateFormat: 'd/m/y H:i'});
  }

  updateTypeSelectView() {
    this.view.typeSelectView.setValue(this.#point.type);
  }

  updateDestinationSelectView() {
    const destination = this.model.destinations.findById(this.#point.destinationId);

    this.view.destinationSelectView
      .setLabel(this.#point.type)
      .setValue(destination.name);
  }

  updateDatePickerView() {
    this.view.datePickerView
      .setStartDate(formatDateWithTime(this.#point.startDate))
      .setEndDate(formatDateWithTime(this.#point.endDate));
  }

  updatePriceInputView() {
    this.view.priceInputView.setPrice(this.#point.basePrice);
  }

  updateOfferSelectView() {
    const selectedType = this.view.typeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(selectedType).items;

    /** @type {OfferOptionState[]} */
    const optionStates = availableOffers.map((offer) => {
      const {id, title, price} = offer;
      const isChecked = this.#point.offerIds.includes(id);

      return [id, title, price, isChecked];
    });

    this.view.offerSelectView
      .setOptions(optionStates);
  }

  updateDestinationDetailsView() {
    const selectedDestinationName = this.view.destinationSelectView.getValue();
    const destination = this.model.destinations.findBy('name', selectedDestinationName);

    /** @type {DestinationPictureState[]} */
    const pictureStates = destination.pictures.map((picture) => [picture.src, picture.description]);

    this.view.destinationDetailsView
      .setDescription(destination.description)
      .setPictures(pictureStates);
  }

  onTypeSelectChange() {
    const value = this.view.typeSelectView.getValue();
    const key = Type.findKey(value);

    this.view.destinationSelectView.setLabel(TypeLabel[key]);
    this.updateOfferSelectView();
  }

  onDestinationSelectChange() {
    this.updateDestinationDetailsView();
  }

  onPointEdit() {
    this.#point = this.model.editablePoint;

    /** @type {PointView} */
    const editablePoint = document.querySelector(`#point-${this.#point.id}`);

    this.view.close(true);

    this.updateTypeSelectView();
    this.updateDestinationSelectView();
    this.updateDatePickerView();
    this.updatePriceInputView();
    this.updateOfferSelectView();
    this.updateDestinationDetailsView();

    this.view
      .link(editablePoint)
      .open();
  }

  /**
   * Событие reset происходит на форме => кнопка DELETE
   * @param {Event} event
   */
  async onPointEditorReset(event) {
    event.preventDefault();

    const editablePointId = this.model.editablePoint.id;

    try {
      await this.model.points.remove(editablePointId);
      this.view.close();

    } catch (exception) {
      // shake
    }
  }
}