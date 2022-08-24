import ComponentView from './component-view.js';
import createFilterTemplate from './filter-template.js';

/** Представление фильтра путешествий */
export default class FilterView extends ComponentView {

  /** @override */
  createAdjacentHtml() {
    return createFilterTemplate();
  }
}

customElements.define('trip-filter', FilterView);
