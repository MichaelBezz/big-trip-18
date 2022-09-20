import he from 'he';
import './price-input-view.css';

import View, {html} from './view.js';

/** Представление цены */
export default class PriceInputView extends View {
  constructor() {
    super();

    /** @type {HTMLInputElement} */
    this.inputView = this.querySelector('.event__input--price');

    this.classList.add('event__field-group', 'event__field-group--price');
  }

  /** @override */
  createAdjacentHtml() {
    return html`
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">Price</span>
        &euro;
      </label>
      <input
        class="event__input  event__input--price"
        id="event-price-1"
        type="number"
        pattern="/^([1-9]\d*)$/"
        name="base_price"
        value=""
      >
    `;
  }

  /**
   * @param {string} value
   */
  setPrice(value) {
    this.inputView.value = value;

    return this;
  }

  getPrice() {
    return he.encode(this.inputView.value);
  }
}

customElements.define(String(PriceInputView), PriceInputView);
