import TripRouteView from '../view/trip-route-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripPointCreatorView from '../view/trip-point-creator-view.js';
import TripPointEditorView from '../view/trip-point-editor-view.js';

/** Управление маршрутом путешествия */
export default class TripRoutePresenter {
  tripRouteView = new TripRouteView();

  init(routeContainer, tripPointModel) {
    this.routeContainer = routeContainer;
    this.tripPointModel = tripPointModel;
    this.tripPoints = [...this.tripPointModel.points];

    this.tripRouteView.append(new TripPointEditorView);

    for (let i = 0; i < this.tripPoints.length; i++) {
      this.tripRouteView.append(new TripPointView(this.tripPoints[i]));
    }

    this.tripRouteView.append(new TripPointCreatorView);

    routeContainer.append(this.tripRouteView);
  }
}
