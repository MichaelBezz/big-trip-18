import ComponentView, {html} from './component-view.js';

/** Представление цены */
export default class PriceInputView extends ComponentView {
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
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
    `;
  }

  /**
   * @param {string} value
   */
  setValue(value) {
    this.inputView.value = value;

    return this;
  }

  getValue() {
    return this.inputView.value;
  }
}

customElements.define(String(PriceInputView), PriceInputView);
