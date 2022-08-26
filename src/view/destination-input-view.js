import ComponentView, {html} from './component-view.js';

export default class DestinationInputView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__field-group', 'event__field-group--destination');
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
   * Установит тип точки
   * @param {PointType} type
   */
  setLabel(type) {
    this.querySelector('.event__type-output').textContent = type;

    return this;
  }

  /**
   * Установит место назначения
   * @param {string} destination
   */
  setValue(destination) {
    this.querySelector('.event__input--destination').value = destination;

    return this;
  }

  /**
   * Установит пункты назначениея в datalist
   * @param {[string, string][]} states
   */
  setOptions(states) {
    const views = states.map((state) => new Option(...state));

    this.querySelector('datalist').replaceChildren(...views);

    return this;
  }
}

customElements.define(String(DestinationInputView), DestinationInputView);
