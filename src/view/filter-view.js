import BaseView from './base-view.js';
import createFilterTemplate from './filter-template.js';

/** Фильтр путешествий */
export default class FilterView extends BaseView {
  /** @override */
  createAdjacentHtml() {
    return createFilterTemplate(...arguments);
  }
}

customElements.define('trip-filter', FilterView);
