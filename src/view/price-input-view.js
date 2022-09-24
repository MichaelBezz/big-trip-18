import View, {html} from './view.js';
import './price-input-view.css';

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
        min="1"
        max="1000000"
        step="1"
        name="base_price"
        value=""
        required
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
    return this.inputView.value;
  }
}

customElements.define(String(PriceInputView), PriceInputView);
