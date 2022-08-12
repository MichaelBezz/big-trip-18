import TripRouteView from '../view/trip-route-view.js';
import TripPointView from '../view/trip-point-view.js';
import TripPointEditorView from '../view/trip-point-editor-view.js';

const MAX_POINT = 3;

/** Управление маршрутом путешествия */
export default class TripRoutePresenter {
  tripRouteView = new TripRouteView();

  init(сontainer) {
    this.сontainer = сontainer;

    this.tripRouteView.append(new TripPointEditorView);

    for (let i = 0; i < MAX_POINT; i++) {
      this.tripRouteView.append(new TripPointView);
    }

    сontainer.append(this.tripRouteView);
  }
}
