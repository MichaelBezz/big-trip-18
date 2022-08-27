import ComponentView, {html} from './component-view.js';
import SortView from './sort-view.js';

/** Представление маршрута путешествия */
export default class RouteView extends ComponentView {
  constructor() {
    super();

    this.classList.add('trip-events');

    this.sortView = new SortView();
    this.routeMapView = this.querySelector('.trip-events__list');
    this.messageView = this.querySelector('.trip-events__msg');
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
    this.messageView.replaceWith(this.sortView);

    return this;
  }

  /**
   * Покажет сообщение и уберет сортировку
   * @param {string} message
   */
  showMessage(message) {
    this.messageView.textContent = message;

    this.sortView.replaceWith(this.messageView);

    return this;
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
