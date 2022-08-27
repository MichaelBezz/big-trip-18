/** @typedef {import('../model/route-model').default} RouteModel */
import {formatDate, formatTime, formatDateWithTime} from '../utils.js';
import {POINT_TYPES} from '../mock/const-mock.js';
import RouteView from '../view/route-view.js';
import PointView from '../view/point-view.js';
import PointEditorView from '../view/point-editor-view.js';

/** Презентор маршрута */
export default class RoutePresenter {
  #model = null;
  #view = null;
  #pointEditorView = null;

  /**
   * @param {RouteModel} model
   */
  constructor(model) {
    this.#model = model;

    /** @type {RouteView} */
    this.#view = document.querySelector(String(RouteView));

    /** @type {PointEditorView} */
    this.#pointEditorView = new PointEditorView();

    this.#model.ready().then(() => {
      const points = this.#model.getPoints();

      if (!points && points.length) {
        this.#view.showMessage('Click New Event to create your first point');

        return;
      }

      this.#view
        .hideMessage()
        .setPoints(...points.map(this.#createPointView, this));
    });
  }

  /**
   * Создаст точку на маршруте
   * @param {AdaptedPoint} point
   */
  #createPointView(point) {
    const pointView = new PointView();

    const destination = this.#model.getDestinationById(point.destinationId);
    const compositeTitle = `${point.type} ${destination.name}`;

    const date = formatDate(point.startDate);
    const startTime = formatTime(point.startDate);
    const endTime = formatTime(point.endDate);

    const offers = this.#model.getSelectedOffers(point.type, point.offerIds);
    const selectedOfferStates = offers.map((offer) => {
      const {title, price} = offer;

      return [title, price];
    });

    pointView.offerListView
      .setOffers(selectedOfferStates);

    pointView
      .setDate(point.startDate, date)
      .setIcon(point.type)
      .setTitle(compositeTitle)
      .setStartTime(point.startDate, startTime)
      .setEndTime(point.endDate, endTime)
      .setPrice(point.basePrice);

    pointView.addEventListener(':expand', () => {
      this.#pointEditorView.close();
      this.#updatePointView(point);
      this.#pointEditorView
        .link(pointView)
        .open();
    });

    return pointView;
  }

  /**
   * Создаст форму редактирования точки
   * @param {AdaptedPoint} point
   */
  #updatePointView(point) {
    // TypeSelectView
    const typeSelectStates = POINT_TYPES.map((item) => {
      const label = item;
      const value = item;
      const isChecked = item === point.type;

      return [label, value, isChecked];
    });

    this.#pointEditorView.typeSelectView
      .setOptions(typeSelectStates)
      .select(point.type);

    // DestinationInputView
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

    this.#pointEditorView.destinationInputView
      .setLabel(point.type)
      .setValue(destination.name)
      .setOptions(destinationInputStates);

    // DatePickerView
    const startDate = formatDateWithTime(point.startDate);
    const endDate = formatDateWithTime(point.endDate);

    this.#pointEditorView.datePickerView
      .setStartTime(startDate)
      .setEndTime(endDate);

    // PriceInputView
    this.#pointEditorView.priceInputView
      .setPrice(point.basePrice);

    // OfferSelectView
    const availableOffers = this.#model.getAvailableOffers(point.type);

    const availableOfferStates = availableOffers.map((offer) => {
      const {id, title, price} = offer;

      const isChecked = point.offerIds.includes(id);

      return [id, title, price, isChecked];
    });

    this.#pointEditorView.offerSelectView
      .setOptions(availableOfferStates);

    // DestinationDetailsView
    const destinationPictureStates = destination.pictures.map((picture) => {
      const {src, description} = picture;

      return [src, description];
    });

    this.#pointEditorView.destinationDetailsView
      .setDescription(destination.description)
      .setPictures(destinationPictureStates);
  }
}
