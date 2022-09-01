/** @typedef {import('../adapter/point-adapter').default} PointAdapter */
/** @typedef {import('../model/route-model').default} RouteModel */
/** @typedef {import('../view/point-view').default} PointView */

import PointEditorView from '../view/point-editor-view.js';

import Type from '../enum/type.js';
import TypeLabel from '../enum/type-label.js';
import {formatDateWithTime, formatNumber} from '../utils.js';

/** Презентор формы редактирования */
export default class EditorPresenter {
  /** @type {RouteModel} */
  #model = null;

  /** @type {PointEditorView} */
  #view = null;

  /** @type {PointAdapter}*/
  #point = null;

  /**
   * @param {RouteModel} model
   */
  constructor(model) {
    this.#model = model;
    this.#view = new PointEditorView();

    this.buildTypeSelectView();
    this.buildDestinationSelectView();

    document.addEventListener('point-edit', this.onPointEdit.bind(this));
    this.#view.typeSelectView.addEventListener('change', this.onTypeSelectChange.bind(this));
    this.#view.destinationSelectView.addEventListener('change', this.onDestinationSelectChange.bind(this));
  }

  buildTypeSelectView() {
    /** @type {[string, string][]} */
    const optionStates = Object.values(Type).map((type) => {
      const key = Type.findKey(type);
      const label = TypeLabel[key];

      return [label, type];
    });

    this.#view.typeSelectView
      .setOptions(optionStates);
  }

  buildDestinationSelectView() {
    const destinationNames = this.#model
      .getDestinations()
      .map((destination) => destination.name);

    /** @type {[string, string][]} */
    const optionStates = [...new Set(destinationNames)].map((name) => ['', name]);

    this.#view.destinationSelectView
      .setOptions(optionStates);
  }

  updateTypeSelectView() {
    this.#view.typeSelectView.setValue(this.#point.type);
  }

  updateDestinationSelectView() {
    const destination = this.#model.getDestinationById(this.#point.destinationId);

    this.#view.destinationSelectView
      .setLabel(this.#point.type)
      .setValue(destination.name);
  }

  updateDatePickerView() {
    this.#view.datePickerView
      .setStartTime(formatDateWithTime(this.#point.startDate))
      .setEndTime(formatDateWithTime(this.#point.endDate));
  }

  updatePriceInputView() {
    this.#view.priceInputView.setPrice(formatNumber(this.#point.basePrice));
  }

  updateOfferSelectView() {
    const selectedType = this.#view.typeSelectView.getValue();
    const availableOffers = this.#model.getAvailableOffers(selectedType);

    /** @type {[number, string, number, boolean][]} */
    const optionStates = availableOffers.map((offer) => {
      const {id, title, price} = offer;
      const isChecked = this.#point.offerIds.includes(id);

      return [id, title, price, isChecked];
    });

    this.#view.offerSelectView
      .setOptions(optionStates);
  }

  updateDestinationDetailsView() {
    const selectedDestinationName = this.#view.destinationSelectView.getValue();
    const destination = this.#model.getDestinations().find((item) => item.name === selectedDestinationName);

    /** @type {[string, string][]} */
    const pictureStates = destination.pictures.map((picture) => [picture.src, picture.description]);

    this.#view.destinationDetailsView
      .setDescription(destination.description)
      .setPictures(pictureStates);
  }

  /** Обрабатывает событие TypeSelectView > change */
  onTypeSelectChange() {
    const value = this.#view.typeSelectView.getValue();
    const key = Type.findKey(value);

    this.#view.destinationSelectView.setLabel(TypeLabel[key]);
    this.updateOfferSelectView();
  }

  /** Обработает событие DestinationSelectView > change */
  onDestinationSelectChange() {
    this.updateDestinationDetailsView();
  }

  /**
   * Обработает событие на PointView > point-edit
   * @param {CustomEvent & {target: PointView, detail: number}} event
   */
  onPointEdit(event) {
    this.#point = this.#model.getPointById(event.detail);

    this.#view.close();

    this.updateTypeSelectView();
    this.updateDestinationSelectView();
    this.updateDatePickerView();
    this.updatePriceInputView();
    this.updateOfferSelectView();
    this.updateDestinationDetailsView();

    this.#view
      .link(event.target)
      .open();
  }
}
