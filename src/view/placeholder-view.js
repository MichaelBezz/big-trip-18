import View, {html} from './view.js';

/** Представление placeholder */
export default class PlaceholderView extends View {

  /** @override */
  createAdjacentHtml() {
    return html`
      <p class="trip-events__msg">Loading...</p>
    `;
  }

  /**
   * Установит placeholder
   * @param {string} placeholder
   */
  setPlaceholder(placeholder) {
    this.querySelector('.trip-events__msg').textContent = placeholder;

    return this;
  }
}

customElements.define(String(PlaceholderView), PlaceholderView);
