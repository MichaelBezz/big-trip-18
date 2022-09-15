import RadioGroupView, {html} from './radio-group-view.js';

/** Представление меню типов */
export default class PointTypeSelectView extends RadioGroupView {
  constructor() {
    super();

    this.classList.add('event__type-wrapper');

    this.addEventListener('change', this.onChange);
  }

  /** @override */
  createAdjacentHtml() {
    return html`
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          <!-- TypeOptionView -->
        </fieldset>
      </div>
    `;
  }

  /**
   * @param  {TypeOptionState} state
   */
  createOptionHtml(...state) {
    const [label, value] = state;

    return html`
      <div class="event__type-item">
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
      </div>
    `;
  }

  /**
   * Установит пункты меню
   * @param {TypeOptionState[]} states
   */
  setOptions(states) {
    this.querySelector('.event__type-group').insertAdjacentHTML('beforeend', html`${
      states.map((state) => this.createOptionHtml(...state))
    }`);

    return this;
  }

  /**
   * Выберет пункт меню и установит иконку
   * @param {string} value
   */
  setValue(value) {
    super.setValue(value);

    this.querySelector('img').src = `img/icons/${value}.png`;

    return this;
  }

  /**
   * Закроет меню типов
   * @param {boolean} flag
   */
  collapse(flag = true) {
    /** @type {HTMLInputElement} */
    (this.querySelector('.event__type-toggle')).checked = flag;

    return this;
  }

  /**
   * @param {Event & {target: HTMLInputElement}} event
   */
  onChange(event) {
    const {type, value} = event.target;

    if (type === 'checkbox') {
      event.stopPropagation();

      return;
    }

    if (type === 'radio') {
      this.setValue(value).collapse(false);
    }
  }
}

customElements.define(String(PointTypeSelectView), PointTypeSelectView);
