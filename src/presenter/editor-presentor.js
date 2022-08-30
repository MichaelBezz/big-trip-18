/** @typedef {import('../adapter/point-adapter').default} PointAdapter */
/** @typedef {import('../model/route-model').default} RouteModel */
/** @typedef {import('../view/point-view').default} PointView */

import Type from '../enum/type.js';
import TypeLabel from '../enum/type-label.js';
import {formatDateWithTime, formatNumber} from '../utils.js';

import PointEditorView from '../view/point-editor-view.js';

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
  }

  /**
   * Обновит точку
   * @param {PointAdapter} point
   */
  updatePointView(point) {this
    .updateTypeSelectView(point)
    .updateDestinationInputView(point)
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
  updateDestinationInputView(point) {
    const destination = this.#model.getDestinationById(point.destinationId);

    const destinationNames = this.#model
      .getDestinations()
      .map((item) => item.name);

    const uniqueDestinationNames = Array.from(new Set(destinationNames));

    /** @type {[string, string][]} */
    const destinationInputStates = uniqueDestinationNames.map((name) => ['', name]);

    this.#view.destinationInputView
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
   * Получит состояния (доступных) опций
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

    /** @type {[string, string][]} */
    const destinationPictureStates = destination.pictures.map((picture) => [picture.src, picture.description]);

    this.#view.destinationDetailsView
      .setDescription(destination.description)
      .setPictures(destinationPictureStates);

    return this;
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

    this.#view.destinationInputView
      .setLabel(typeLabel);

    this.#view.offerSelectView
      .setOptions(availableOfferStates);
  }
}
