import SortView from '../view/trip-sort-view.js';
import RouteView from '../view/trip-route-view.js';
import PointView from '../view/trip-point-view.js';
import PointEditorView from '../view/trip-point-editor-view.js';

const MAX_POINT = 3;

/** Управление маршрутом путешествия */
export default class TripRoutePresenter {
  tripRoute = new RouteView();

  init(сontainer) {
    this.сontainer = сontainer;

    сontainer.append(new SortView);
    сontainer.append(this.tripRoute);
    this.tripRoute.append(new PointEditorView);

    for (let i = 0; i < MAX_POINT; i++) {
      this.tripRoute.append(new PointView);
    }
  }
}
