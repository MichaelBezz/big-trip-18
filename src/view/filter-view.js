import BaseView from './base-view.js';
import createFilterTemplate from './filter-template.js';

/** Представление фильтра путешествий */
export default class FilterView extends BaseView {

  /** @override */
  createAdjacentHtml() {
    return createFilterTemplate();
  }
}

customElements.define('trip-filter', FilterView);
