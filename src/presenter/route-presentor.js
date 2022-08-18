import {formatDate, formatTime} from '../utils.js';
import RouteModel from '../model/route-model.js';
import RouteView from '../view/route-view.js';
import PointView from '../view/point-view.js';
import OfferView from '../view/offer-view.js';
import PointEditorView from '../view/point-editor-view.js';

/** Презентор маршрута */
export default class RoutePresenter {
  constructor() {
    this.model = new RouteModel();
    this.view = new RouteView();
    this.pointEditorView = new PointEditorView();
  }

  /**
   * Инициализирует RoutePresenter
   * @param {HTMLElement} routeContainer
   */
  init(routeContainer) {
    const points = this.model.get();

    // this.view.append(this.pointEditorView);
    this.view.append(...points.map(this.createPointView, this));

    routeContainer.append(this.view);
  }

  /**
   * Создаст дополнительную опцию
   * @param {Offer} offer
   */
  createOfferView(offer) {
    return new OfferView()
      .setTitle(offer.title)
      .setPrice(offer.price);
  }

  /**
   * Создаст точку на маршруте
   * @param {AggregatedPoint} point
   */
  createPointView(point) {
    const pointView = new PointView();

    const title = `${point.type} ${point.destination.name}`;

    pointView
      .setDate(formatDate(point.dateFrom), point.dateFrom)
      .setIcon(point.type)
      .setTitle(title)
      .setStartTime(formatTime(point.dateFrom), point.dateFrom)
      .setEndTime(formatTime(point.dateTo), point.dateTo)
      .setPrice(point.basePrice)
      .replaceOffers(...point.offers.map(this.createOfferView, this));

    pointView.addEventListener('expand', () => {
      this.pointEditorView.close();
      // this.updatePointView(point);
      this.pointEditorView.link(pointView).open();
    });

    return pointView;
  }
  // TODO метод обновления формы редактирования
  // updatePointView(point) {}
}
