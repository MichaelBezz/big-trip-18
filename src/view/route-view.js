import ComponentView, {html} from './component-view.js';
import SortSelectView from './sort-select-view.js';

// TODO Удалить или переработать файл

/** @typedef {import('./point-view').default} PointView */

/** Представление маршрута путешествия */
export default class RouteView extends ComponentView {
  constructor() {
    super();

    /** @type {SortSelectView}*/
    this.sortSelectView = new SortSelectView();

    /** @type {HTMLDivElement} */
    this.routeMapView = this.querySelector('.trip-events__list');

    /** @type {HTMLParagraphElement} */
    this.placeholderView = this.querySelector('.trip-events__msg');

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
  hidePlaceholder() {
    this.placeholderView.replaceWith(this.sortSelectView);

    return this;
  }

  /**
   * Покажет сообщение и уберет сортировку
   * @param {string} message
   */
  showPlaceholder(message) {
    this.placeholderView.textContent = message;

    this.sortSelectView.replaceWith(this.placeholderView);

    return this;
  }
}

customElements.define(String(RouteView), RouteView);
