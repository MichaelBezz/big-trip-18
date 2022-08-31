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
  updatePointView(point) {
    const destination = this.#model.getDestinationById(point.destinationId);

    /** TypeSelectView */
    this.#view.typeSelectView
      .setOptions(this.updateTypeSelectStates())
      .select(point.type);

    /** DestinationSelectView */
    this.#view.destinationSelectView
      .setLabel(point.type)
      .setValue(destination.name)
      .setOptions(this.updateDestinationSelectStates());

    /** DatePickerView */
    this.#view.datePickerView
      .setStartTime(formatDateWithTime(point.startDate))
      .setEndTime(formatDateWithTime(point.endDate));

    /** PriceInputView */
    this.#view.priceInputView
      .setPrice(formatNumber(point.basePrice));

    /** OfferSelectView */
    this.#view.offerSelectView
      .setOptions(this.updateAvailableOfferStates(point.type, point.offerIds));

    /** DestinationDetailsView */
    this.#view.destinationDetailsView
      .setDescription(destination.description)
      .setPictures(this.updateDestinationPictureStates(destination.pictures));
  }

  /**
   * Обновит состояния меню с типами
   * @return {[string, PointType][]}
   */
  updateTypeSelectStates() {
    return Object.values(Type).map((type) => {
      const label = TypeLabel[Type.findKey(type)];

      return [label, type];
    });
  }

  /**
   * Обновит состояния меню c пунктами назначения
   * @return {[string, string][]}
   */
  updateDestinationSelectStates() {
    const destinationNames = this.#model
      .getDestinations()
      .map((destination) => destination.name);

    const uniqueDestinationNames = Array.from(new Set(destinationNames));

    return uniqueDestinationNames.map((name) => ['', name]);
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
   * Обновит состояние изображений пункта назначения
   * @param {Picture[]} pictures
   * @return {[string, string][]}
   */
  updateDestinationPictureStates(pictures) {
    return pictures.map((picture) => [picture.src, picture.description]);
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
    const destinationSelectValue = event.target.getValue();

    const destination = destinations.find((item) => item.name === destinationSelectValue);

    this.#view.destinationDetailsView
      .setDescription(destination.description)
      .setPictures(this.updateDestinationPictureStates(destination.pictures));
  }
}
