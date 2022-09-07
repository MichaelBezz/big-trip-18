import ComponentView, {html} from './component-view.js';

/** Представление placeholder */
export default class FilterPlaceholderView extends ComponentView {

  /** @override */
  createAdjacentHtml() {
    return html`
      <p class="trip-events__msg"></p>
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

customElements.define(String(FilterPlaceholderView), FilterPlaceholderView);
