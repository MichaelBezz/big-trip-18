import BaseView from './base-view.js';
import createSortTemplate from './trip-sort-template.js';

/** Сортировка событий на маршруте путешествия */
export default class TripSortView extends BaseView {
  /** @override */
  createAdjacentHtml() {
    return createSortTemplate(...arguments);
  }
}

customElements.define('trip-sort', TripSortView);
