import {formatDate, formatTime, formatDateWithTime} from '../utils.js';
import RouteModel from '../model/route-model.js';
import RouteView from '../view/route-view.js';
import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import PointEditorView from '../view/point-editor-view.js';
import OfferAvailableView from '../view/offer-available-view.js';
import OfferSelectedView from '../view/offer-selected-view.js';
import MessageView from '../view/message-view.js';

/** Презентор маршрута */
export default class RoutePresenter {
  #container = null;
  #model = null;
  #view = null;

  #messegeView = null;
  #sortView = null;
  #pointEditorView = null;

  constructor(container) {
    this.#container = container;
    this.#model = new RouteModel();
    this.#view = new RouteView();

    this.#messegeView = new MessageView;
    this.#sortView = new SortView;
    this.#pointEditorView = new PointEditorView();
  }

  /** Инициализирует RoutePresenter */
  init() {
    const points = this.#model.getPoints();

    if (points && points.length) {
      this.#container.append(this.#sortView);
      this.#view.append(...points.map(this.#createPointView, this));
    } else {
      this.#view.append(this.#messegeView);
    }

    this.#container.append(this.#view);
  }

  /**
   * Создаст точку на маршруте
   * @param {AdaptedPoint} point
   */
  #createPointView(point) {
    const pointView = new PointView();

    const destination = this.#model.getDestinationById(point.destinationId);
    const title = `${point.type} ${destination.name}`;

    const date = formatDate(point.startDate);
    const startTime = formatTime(point.startDate);
    const endTime = formatTime(point.endDate);

    const offers = this.#model.getSelectedOffers(point.type, point.offerIds);

    pointView
      .setDate(date, point.startDate)
      .setIcon(point.type)
      .setTitle(title)
      .setStartTime(startTime, point.startDate)
      .setEndTime(endTime, point.endDate)
      .setPrice(point.basePrice)
      .replaceOffers(...offers.map(this.#createOfferSelectedView, this));

    pointView.addEventListener('expand', () => {
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
    const destination = this.#model.getDestinationById(point.destinationId);

    const startDate = formatDateWithTime(point.startDate);
    const endDate = formatDateWithTime(point.endDate);

    const offers = this.#model.getAvailableOffers(point.type);

    return this.#pointEditorView
      .setIcon(point.type)
      .setType(point.type)
      .setDestination(destination.name)
      .setStartTime(startDate)
      .setEndTime(endDate)
      .setPrice(point.basePrice)
      .setDescription(destination.description)
      .replaceOffers(...offers.map(this.#createOfferAvailableView, this));
  }

  /**
   * Создаст (доступную) дополнительную опцию
   * @param {Offer} offer
   */
  #createOfferAvailableView(offer) {
    return new OfferAvailableView()
      .setTitle(offer.title)
      .setPrice(offer.price);
  }

  /**
   * Создаст (выбранную) дополнительную опцию
   * @param {Offer} offer
   */
  #createOfferSelectedView(offer) {
    return new OfferSelectedView()
      .setTitle(offer.title)
      .setPrice(offer.price);
  }
}
