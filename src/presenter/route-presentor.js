import {formatDate, formatTime} from '../utils.js';

import RouteModel from '../model/route-model.js';
import RouteView from '../view/route-view.js';
import PointView from '../view/point-view.js';
import PointEditorView from '../view/point-editor-view.js';

/** Управляет маршрутом */
export default class RoutePresenter {
  view = new RouteView();
  model = new RouteModel();

  init(routeContainer) {
    const points = this.model.get();

    this.view.append(new PointEditorView);
    this.view.append(...points.map(this.createPointView, this));

    routeContainer.append(this.view);
  }

  /**
   * Создает точку на маршруте
   * @param {AggregatedPoint} point
   */
  createPointView(point) {
    const {
      type,
      destination,
      dateFrom,
      dateTo,
      basePrice
    } = point;

    const title = `${type} ${destination.name}`;

    return new PointView()
      .setDate(formatDate(dateFrom), dateFrom)
      .setIcon(type)
      .setTitle(title)
      .setStartTime(formatTime(dateFrom), dateFrom)
      .setEndTime(formatTime(dateTo), dateTo)
      .setPrice(basePrice);
  }
}
