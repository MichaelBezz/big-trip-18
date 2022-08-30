import ComponentView, {html} from './component-view.js';

/** Представление типа точки */
export default class TypeOptionView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__type-item');
  }

  /**
   * @override
   * @param {String} label
   * @param {PointType} value
   */
  createAdjacentHtml(label, value) {
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
