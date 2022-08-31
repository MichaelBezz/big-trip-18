/** @typedef {import('../adapter/point-adapter').default} PointAdapter */
/** @typedef {import('../model/route-model').default} RouteModel */
/** @typedef {import('../view/point-view').default} PointView */
/** @typedef {import('../view/destination-select-view').default} DestinationSelectView */

import PointEditorView from '../view/point-editor-view.js';

import Type from '../enum/type.js';
import TypeLabel from '../enum/type-label.js';
import {formatDateWithTime, formatNumber} from '../utils.js';

/** Презентор формы редактирования */
export default class EditorPresenter {
  #model = null;
  #view = null;

  /**
   * @param {RouteModel} model
   */
  constructor(model) {
    /** @type {RouteModel} */
    this.#model = model;

    /** @type {PointEditorView} */
    this.#view = new PointEditorView();

    document.addEventListener('point-edit', this.onPointEdit.bind(this));
    this.#view.addEventListener('type-change', this.onTypeChange.bind(this), true);
    this.#view.addEventListener('destination-change', this.onDestinationChange.bind(this), true);
  }

  /**
   * Обновит точку
   * @param {PointAdapter} point
   */
  updatePointView(point) {this
    .updateTypeSelectView(point)
    .updateDestinationSelectView(point)
    .updateDatePickerView(point)
    .updatePriceInputView(point)
    .updateOfferSelectView(point)
    .updateDestinationDetailsView(point);
  }

  /**
   * Обновит меню с типами
   * @param {PointAdapter} point
   */
  updateTypeSelectView(point) {
    /** @type {[string, PointType][]} */
    const typeSelectStates = Object.values(Type).map((type) => {
      const label = TypeLabel[Type.findKey(type)];
      const value = type;

      return [label, value];
    });

    this.#view.typeSelectView
      .setOptions(typeSelectStates)
      .select(point.type);

    return this;
  }

  /**
   * Обновит пункт назначения
   * @param {PointAdapter} point
   */
  updateDestinationSelectView(point) {
    const destination = this.#model.getDestinationById(point.destinationId);

    const destinationNames = this.#model
      .getDestinations()
      .map((item) => item.name);

    const uniqueDestinationNames = Array.from(new Set(destinationNames));

    /** @type {[string, string][]} */
    const destinationInputStates = uniqueDestinationNames.map((name) => ['', name]);

    this.#view.destinationSelectView
      .setLabel(point.type)
      .setValue(destination.name)
      .setOptions(destinationInputStates);

    return this;
  }

  /**
   * Обновит дату и время
   * @param {PointAdapter} point
   */
  updateDatePickerView(point) {
    this.#view.datePickerView
      .setStartTime(formatDateWithTime(point.startDate))
      .setEndTime(formatDateWithTime(point.endDate));

    return this;
  }

  /**
   * Обновит цену
   * @param {PointAdapter} point
   */
  updatePriceInputView(point) {
    this.#view.priceInputView
      .setPrice(formatNumber(point.basePrice));

    return this;
  }

  /**
   * Обновит список (доступных) опций
   * @param {PointAdapter} point
   */
  updateOfferSelectView(point) {
    this.#view.offerSelectView
      .setOptions(this.updateAvailableOfferStates(point.type, point.offerIds));

    return this;
  }

  /**
   * Обновит состояния (доступных) опций
   * @param {PointType} type
   * @param {number[]} offerIds
   * @return {[number, string, number, boolean][]}
   */
  updateAvailableOfferStates(type, offerIds = []) {
    const availableOffers = this.#model.getAvailableOffers(type);

    return availableOffers.map((offer) => {
      const {id, title, price} = offer;
      const isChecked = offerIds.includes(id);

      return [id, title, price, isChecked];
    });
  }

  /**
   * Обновит описание пункта назначения
   * @param {PointAdapter} point
   */
  updateDestinationDetailsView(point) {
    const destination = this.#model.getDestinationById(point.destinationId);

    this.#view.destinationDetailsView
      .setDescription(destination.description)
      .setPictures(this.updateDestinationPictureStates(destination));

    return this;
  }

  /**
   * Обновит состояние изображений пункта назначения
   * @param {Destination} destination
   * @return {[string, string][]}
   */
  updateDestinationPictureStates(destination) {
    return destination.pictures.map((picture) => [picture.src, picture.description]);
  }

  /**
   * Обработает событие на PointView > point-edit
   * @param {CustomEvent & {target: PointView, detail: number}} event
   */
  onPointEdit(event) {
    const point = this.#model.getPointById(event.detail);

    this.#view.close();
    this.updatePointView(point);
    this.#view
      .link(event.target)
      .open();
  }

  /**
   * Обрабатывает событие TypeSelectView > type-change
   * @param {CustomEvent & {detail: PointType}} event
   */
  onTypeChange(event) {
    const typeLabel = TypeLabel[Type.findKey(event.detail)];
    const availableOfferStates = this.updateAvailableOfferStates(event.detail);

    this.#view.destinationSelectView
      .setLabel(typeLabel);

    this.#view.offerSelectView
      .setOptions(availableOfferStates);
  }

  /**
   * Обработает событие DestinationSelectView > destination-change
   * @param {CustomEvent & {target: DestinationSelectView}} event
   */
  onDestinationChange(event) {
    const destinations = this.#model.getDestinations();
    const destinationValue = event.target.getValue();

    const destination = destinations.find((item) => item.name === destinationValue);

    this.#view.destinationDetailsView
      .setDescription(destination.description)
      .setPictures(this.updateDestinationPictureStates(destination));
  }
}
