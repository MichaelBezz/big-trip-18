import ComponentView, {html} from './component-view.js';
import SortSelectView from './sort-select-view.js';
import './route-view.css';

import Sort from '../enum/sort.js';
import SortLabel from '../enum/sort-label.js';
import SortDisabled from '../enum/sort-disabled.js';

/** Представление маршрута путешествия */
export default class RouteView extends ComponentView {
  constructor() {
    super();

    /** @type {SortSelectView}*/
    this.sortSelectView = new SortSelectView();

    /** @type {HTMLDivElement} */
    this.routeMapView = this.querySelector('.trip-events__list');

    /** @type {HTMLParagraphElement} */
    this.messageView = this.querySelector('.trip-events__msg');

    this.classList.add('trip-events');
  }

  /** @override */
  createAdjacentHtml() {
    return html`
      <h2 class="visually-hidden">Trip events</h2>
      <p class="trip-events__msg">Loading...</p>
      <div class="trip-events__list">
        <!-- PointView -->
      </div>
    `;
  }

  /** Заменит сообщение на сортировку */
  hideMessage() {
    this.sortSelectView.setSortOptions(this.createSortStates());
    this.sortSelectView.select(Sort.DAY);
    this.messageView.replaceWith(this.sortSelectView);

    return this;
  }

  /**
   * Покажет сообщение и уберет сортировку
   * @param {string} message
   */
  showMessage(message) {
    this.messageView.textContent = message;

    this.sortSelectView.replaceWith(this.messageView);

    return this;
  }

  /**
   * Вернет состояния для сортировки
   * @return {[string, string, boolean][]}
   */
  createSortStates() {
    return Object.keys(Sort).map((key) => [SortLabel[key], Sort[key], SortDisabled[key]]);
  }

  /**
   * Установит точки
   * @param  {HTMLElement[]} views
   */
  setPoints(...views) {
    views.forEach((view) => view.classList.add('trip-events__item'));

    this.routeMapView.replaceChildren(...views);

    return this;
  }
}

customElements.define(String(RouteView), RouteView);
