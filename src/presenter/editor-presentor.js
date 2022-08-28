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
  }

  /**
   * Инициализирует EditorPresenter
   * @param {AdaptedPoint} point
   * @param {HTMLElement} pointView
   */
  init(point, pointView) {
    this.#view.close();

    this
      .setTypeSelectView(point)
      .setDestinationInputView(point)
      .setDatePickerView(point)
      .setPriceInputView(point)
      .setOfferSelectView(point)
      .setDestinationDetailsView(point);

    this.#view
      .link(pointView)
      .open();
  }

  /** Установит меню с типами */
  setTypeSelectView(point) {
    /** @type {[string, PointType, boolean][]} */
    const typeSelectStates = Object.values(Type).map((type) => {
      const keyType = Type.findKey(type);

      const label = TypeLabel[keyType];
      const value = type;
      const isChecked = type === point.type;

      return [label, value, isChecked];
    });

    this.#view.typeSelectView
      .setOptions(typeSelectStates)
      .select(point.type);

    return this;
  }

  /** Установит пункт назначения */
  setDestinationInputView(point) {
    const destination = this.#model.getDestinationById(point.destinationId);

    const destinationNames = this.#model
      .getDestinations()
      .map((item) => item.name);

    const uniqueDestinationNames = Array.from(new Set(destinationNames));

    const destinationInputStates = uniqueDestinationNames.map((name) => {
      const text = '';
      const value = name;

      return [text, value];
    });

    this.#view.destinationInputView
      .setLabel(point.type)
      .setValue(destination.name)
      .setOptions(destinationInputStates);

    return this;
  }

  /** Установит дату и время */
  setDatePickerView(point) {
    this.#view.datePickerView
      .setStartTime(formatDateWithTime(point.startDate))
      .setEndTime(formatDateWithTime(point.endDate));

    return this;
  }

  /** Установит цену */
  setPriceInputView(point) {
    this.#view.priceInputView
      .setPrice(formatNumber(point.basePrice));

    return this;
  }

  /** Установит список (доступных) опций */
  setOfferSelectView(point) {
    const availableOffers = this.#model.getAvailableOffers(point.type);

    const availableOfferStates = availableOffers.map((offer) => {
      const {id, title, price} = offer;

      const isChecked = point.offerIds.includes(id);

      return [id, title, price, isChecked];
    });

    this.#view.offerSelectView
      .setOptions(availableOfferStates);

    return this;
  }

  /** Установит описание пункта назначения */
  setDestinationDetailsView(point) {
    const destination = this.#model.getDestinationById(point.destinationId);

    const destinationPictureStates = destination.pictures.map((picture) => {
      const {src, description} = picture;

      return [src, description];
    });

    this.#view.destinationDetailsView
      .setDescription(destination.description)
      .setPictures(destinationPictureStates);

    return this;
  }
}
