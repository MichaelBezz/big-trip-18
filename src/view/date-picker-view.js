import ComponentView, {html} from './component-view.js';

/** Представление даты и времени */
export default class DatePickerView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__field-group', 'event__field-group--time');
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="">
      &mdash;
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="">
    `;
  }

  /**
   * Установит время начала
   * @param {string} isoDate
   */
  setStartTime(isoDate) {
    /** @type {HTMLInputElement} */
    (this.querySelector('[name="event-start-time"]')).value = isoDate;

    return this;
  }

  /**
   * Установит время окончания
   * @param {string} isoDate
   */
  setEndTime(isoDate) {
    /** @type {HTMLInputElement} */
    (this.querySelector('[name="event-end-time"]')).value = isoDate;

    return this;
  }
}

customElements.define(String(DatePickerView), DatePickerView);
