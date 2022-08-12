import BaseView from './base-view.js';
import createFilterTemplate from './trip-filter-template.js';

/** Фильтр путешествий */
export default class TripFilterView extends BaseView {
  /** @override */
  createAdjacentHtml() {
    return createFilterTemplate(...arguments);
  }
}

customElements.define('trip-filter', TripFilterView);
