import BaseView from './base-view.js';
import createSortTemplate from './sort-template.js';

/** Представление сортировки точек */
export default class SortView extends BaseView {

  /** @override */
  createTemplate() {
    return createSortTemplate();
  }
}

customElements.define('route-sort', SortView);
