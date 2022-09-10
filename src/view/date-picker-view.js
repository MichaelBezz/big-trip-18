import ComponentView, {html} from './component-view.js';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

/** @typedef {import('flatpickr/dist/types/instance').Instance} Calendar */
/** @typedef {import('flatpickr/dist/types/options').Options} CalendarOptions */
/** @typedef {import('flatpickr/dist/types/options').DateOption} CalendarDate */

/** Представление даты и времени */
export default class DatePickerView extends ComponentView {
  /** @type {Calendar} */
  #startDateCalendar;

  /** @type {Calendar} */
  #endDateCalendar;

  constructor() {
    super();

    /** @type {HTMLInputElement} */
    this.startTimeView = this.querySelector('[name="event-start-time"]');

    /** @type {HTMLInputElement} */
    this.endTimeView = this.querySelector('[name="event-end-time"]');

    this.#startDateCalendar = flatpickr(this.startTimeView, {
      enableTime: true,
      onChange: (dates) => this.#endDateCalendar.set('minDate', dates[0])
    });

    this.#endDateCalendar = flatpickr(this.endTimeView, {
      enableTime: true,
      onChange: (dates) => this.#startDateCalendar.set('maxDate', dates[0])
    });

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
   * @param {CalendarOptions} options
   */
  configure(options) {
    this.#startDateCalendar.set(options);
    this.#endDateCalendar.set(options);

    return this;
  }

  /**
   * @param {CalendarDate} date
   */
  setStartDate(date) {
    this.#startDateCalendar.setDate(date);
    this.#endDateCalendar.set('minDate', date);

    return this;
  }

  getStartDate() {
    return this.#startDateCalendar.selectedDates[0];
  }

  /**
   * @param {CalendarDate} date
   */
  setEndDate(date) {
    this.#endDateCalendar.setDate(date);
    this.#startDateCalendar.set('maxDate', date);

    return this;
  }

  getEndDate() {
    return this.#endDateCalendar.selectedDates[0];
  }
}

customElements.define(String(DatePickerView), DatePickerView);
