import {formatDate, formatTime, formatDateWithTime} from '../utils.js';
import RouteModel from '../model/route-model.js';
import RouteView from '../view/route-view.js';
import PointView from '../view/point-view.js';
import PointEditorView from '../view/point-editor-view.js';
import OfferAvailableView from '../view/offer-available-view.js';
import OfferSelectedView from '../view/offer-selected-view.js';

/** Презентор маршрута */
export default class RoutePresenter {
  #model = null;
  #view = null;
  #pointEditorView = null;

  constructor() {
    this.#model = new RouteModel();
    this.#view = new RouteView();
    this.#pointEditorView = new PointEditorView();
  }

  /**
   * Инициализирует RoutePresenter
   * @param {HTMLElement} routeContainer
   */
  init(routeContainer) {
    const points = this.#model.get();

    this.#view.append(...points.map(this.#createPointView, this));

    routeContainer.append(this.#view);
  }

  /**
   * Создаст точку на маршруте
   * @param {AggregatedPoint} point
   */
  #createPointView(point) {
    const pointView = new PointView();

    const title = `${point.type} ${point.destination.name}`;

    pointView
      .setDate(formatDate(point.dateFrom), point.dateFrom)
      .setIcon(point.type)
      .setTitle(title)
      .setStartTime(formatTime(point.dateFrom), point.dateFrom)
      .setEndTime(formatTime(point.dateTo), point.dateTo)
      .setPrice(point.basePrice)
      .replaceOffers(...point.offers.map(this.#createOfferSelectedView, this));

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
   * @param {AggregatedPoint} point
   */
  #updatePointView(point) {
    return this.#pointEditorView
      .setIcon(point.type)
      .setType(point.type)
      .setDestination(point.destination.name)
      .setStartTime(formatDateWithTime(point.dateFrom))
      .setEndTime(formatDateWithTime(point.dateTo))
      .setPrice(point.basePrice)
      .setDescription(point.destination.description)
      .replaceOffers(...point.offers.map(this.#createOfferAvailableView, this));
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
