/** @typedef {import('./point-view').default} PointView */

import ComponentView, {html} from './component-view.js';
import SortSelectView from './sort-select-view.js';
import './route-view.css';

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
   * Установит точки
   * @param {PointView[]} views
   */
  setPoints(...views) {
    this.routeMapView.replaceChildren(...views);

    return this;
  }
}

customElements.define(String(RouteView), RouteView);
