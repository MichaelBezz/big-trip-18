import BaseView from './base-view.js';
import createPointTemplate from './trip-point-template.js';

/** Событие на маршруте путешествия */
export default class TripPointView extends BaseView {
  /** @override */
  createAdjacentHtml() {
    return createPointTemplate(...arguments);
  }
}

customElements.define('trip-point', TripPointView);
