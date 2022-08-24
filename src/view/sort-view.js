import ComponentView from './component-view.js';
import createSortTemplate from './sort-template.js';

/** Представление сортировки точек */
export default class SortView extends ComponentView {

  /** @override */
  createAdjacentHtml() {
    return createSortTemplate();
  }
}

customElements.define('route-sort', SortView);
