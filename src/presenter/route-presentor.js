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
    const startDate = point['date_from'];
    const endDate = point['date_to'];

    return new PointView()
      .setDate(formatDate(startDate), startDate)
      .setIcon(point.type)
      .setTitle(point.destination.name)
      .setStartTime(formatTime(startDate), startDate)
      .setEndTime(formatTime(endDate), endDate)
      .setPrice(point['base_price']);
  }
}
