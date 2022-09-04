import ComponentView, {html} from './component-view.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

/** Представление даты и времени */
export default class DatePickerView extends ComponentView {
  #datepicker = null;

  constructor() {
    super();

    /** @type {HTMLInputElement} */
    this.startTime = this.querySelector('[name="event-start-time"]');

    /** @type {HTMLInputElement} */
    this.EndTime = this.querySelector('[name="event-end-time"]');

    this.classList.add('event__field-group', 'event__field-group--time');
  }

  /** @override */
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
   * Установит Datepicker
   * @param {HTMLInputElement} view
   * @param {string} defaultDate
   */
  setDatepicker(view, defaultDate) {
    this.#datepicker = flatpickr(
      view,
      {
        defaultDate,
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        // eslint-disable-next-line camelcase
        time_24hr: true,
        locale: {
          firstDayOfWeek: 1 // start week on Monday
        }
      }
    );
  }

  /** Удалит экземпляр Datepicker */
  removeDatepicker() {
    if (this.#datepicker) {
      this.#datepicker.destroy();
      this.#datepicker = null;
    }
  }

  /**
   * Установит время начала
   * @param {string} isoDate
   */
  setStartTime(isoDate) {
    this.startTime.value = isoDate;
    this.setDatepicker(this.startTime, isoDate);

    return this;
  }

  /**
   * Установит время окончания
   * @param {string} isoDate
   */
  setEndTime(isoDate) {
    this.EndTime.value = isoDate;
    this.setDatepicker(this.EndTime, isoDate);

    return this;
  }
}

customElements.define(String(DatePickerView), DatePickerView);
