import RouteView from '../view/route-view.js';
import PointView from '../view/point-view.js';
import PointEditorView from '../view/point-editor-view.js';

/** Управление маршрутом путешествия */
export default class RoutePresenter {
  routeView = new RouteView();

  init(routeContainer, routeModel) {
    this.routeContainer = routeContainer;
    this.routeModel = routeModel;
    this.routePoints = [...this.routeModel.points];

    this.routeView.append(new PointEditorView);

    for (let i = 0; i < this.routePoints.length; i++) {
      this.routeView.append(new PointView(this.routePoints[i]));
    }

    routeContainer.append(this.routeView);
  }
}
