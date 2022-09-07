import ComponentView, {html} from './component-view.js';

/** @typedef {[label: string, value: string]} TypeOptionState */

/** Представление типа точки */
export default class TypeOptionView extends ComponentView {
  /**
   * @param {TypeOptionState} state
   */
  constructor(...state) {
    super(...state);

    this.classList.add('event__type-item');
  }

  /**
   * @override
   * @param {TypeOptionState} state
   */
  createAdjacentHtml(...state) {
    const [label, value] = state;

    return html`
      <input
        id="event-type-${value}"
        class="event__type-input  visually-hidden"
        type="radio"
        name="event-type"
        value="${value}"
      >
      <label
        class="event__type-label  event__type-label--${value}"
        for="event-type-${value}"
      >
        ${label}
      </label>
    `;
  }
}

customElements.define(String(TypeOptionView), TypeOptionView);
