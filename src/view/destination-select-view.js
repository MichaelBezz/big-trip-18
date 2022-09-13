import View, {html} from './view.js';

/** Представление пункта назначения */
export default class DestinationSelectView extends View {
  constructor() {
    super();

    /** @type {HTMLLabelElement} */
    this.labelView = this.querySelector('label.event__label');

    /** @type {HTMLInputElement} */
    this.inputView = this.querySelector('input.event__input');

    /** @type {HTMLDataListElement} */
    this.datalistView = this.querySelector('datalist');

    this.classList.add('event__field-group', 'event__field-group--destination');

    this.addEventListener('focus', this.onFocus, true);
    this.addEventListener('change', this.onChange);
    this.addEventListener('keydown', this.onKeydown);
    this.addEventListener('blur', this.onBlur, true);
  }

  /** @override */
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
        <!-- option -->
      </datalist>
    `;
  }

  /**
   * Установит пункты назначения в datalist
   * @param {DestinationOptionState[]} states
   */
  setOptions(states) {
    const views = states.map((state) => new Option(...state));

    this.datalistView.replaceChildren(...views);

    return this;
  }

  /**
   * Установит label
   * @param {string} value
   */
  setLabel(value) {
    this.labelView.textContent = value;

    return this;
  }

  /**
   * Установит место назначения
   * @param {string} destination
   */
  setDestination(destination) {
    this.inputView.value = destination;

    return this;
  }

  /** Получит место назначения */
  getDestination() {
    return this.inputView.value || this.inputView.placeholder;
  }

  /** Вернет доступные клавиши */
  get allowedKeys() {
    return ['Escape', 'Tab', 'ArrowUp', 'ArrowDown'];
  }

  /** Заменит placeholder на value */
  moveValueToPlaceholder() {
    const {inputView} = this;

    inputView.placeholder = inputView.value;
    inputView.value = '';
  }

  /** Заменит value на placeholder */
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
