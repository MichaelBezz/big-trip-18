import ComponentView, {html} from './component-view.js';

/** Представление сообщения */
export default class MessageView extends ComponentView {

  /** @override */
  createAdjacentHtml() {
    return html`
      <p class="trip-events__msg">Click New Event to create your first point</p>
    `;
  }

  /**
   * Установит сообщение
   * @param {string} message
   */
  setMessage(message) {
    this.querySelector('.trip-events__msg').textContent = message;

    return this;
  }
}

customElements.define(String(MessageView), MessageView);
