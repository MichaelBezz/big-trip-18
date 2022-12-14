import View, {html} from './view.js';

import KeyboardCommand from '../enum/keyboard-command.js';

export default class DestinationSelectView extends View {
  constructor() {
    super();

    /** @type {HTMLLabelElement} */
    this.labelView = this.querySelector('.event__label');

    /** @type {HTMLInputElement} */
    this.inputView = this.querySelector('.event__input--destination');

    /** @type {HTMLDataListElement} */
    this.datalistView = this.querySelector('datalist');

    this.classList.add('event__field-group', 'event__field-group--destination');

    this.addEventListener('focus', this.onFocus, true);
    this.addEventListener('change', this.onChange);
    this.addEventListener('keydown', this.onKeydown);
    this.addEventListener('blur', this.onBlur, true);
  }

  get allowedKeys() {
    return ['Tab', ...Object.values(KeyboardCommand).flat()];
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <label class="event__label  event__type-output" for="event-destination-1"></label>
      <input
        class="event__input  event__input--destination"
        id="event-destination-1"
        type="text"
        name="event-destination"
        value=""
        list="destination-list-1"
      >
      <datalist id="destination-list-1">
        <!-- Options -->
      </datalist>
    `;
  }

  /**
   * @param {DestinationOptionState} state
   */
  createOptionHtml(...state) {
    const [text, value] = state;

    return html`
      <option value="${value}">${text}</option>
    `;
  }

  /**
   * @param {DestinationOptionState[]} states
   */
  setOptions(states) {
    this.datalistView.innerHTML = html`${
      states.map((state) => this.createOptionHtml(...state))
    }`;

    return this;
  }

  /**
   * @param {string} value
   */
  setLabel(value) {
    this.labelView.textContent = value;

    return this;
  }

  /**
   * @param {string} destination
   */
  setDestination(destination) {
    this.inputView.value = destination;

    return this;
  }

  getDestination() {
    return this.inputView.value || this.inputView.placeholder;
  }

  moveValueToPlaceholder() {
    const {inputView} = this;

    inputView.placeholder = inputView.value;
    inputView.value = '';
  }

  movePlaceholderToValue() {
    const {inputView} = this;

    inputView.value = inputView.placeholder;
    inputView.placeholder = '';
  }

  onFocus() {
    this.moveValueToPlaceholder();
  }

  onChange() {
    this.moveValueToPlaceholder();
  }

  /**
   * @param {KeyboardEvent} event
   */
  onKeydown(event) {
    if (!this.allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  onBlur() {
    this.movePlaceholderToValue();
  }
}

customElements.define(String(DestinationSelectView), DestinationSelectView);
