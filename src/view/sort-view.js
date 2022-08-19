import BaseView from './base-view.js';
import createSortTemplate from './sort-template.js';

/** Представление сортировки точек */
export default class SortView extends BaseView {

  /** @override */
  createAdjacentHtml() {
    return createSortTemplate();
  }
}

customElements.define('trip-sort', SortView);
