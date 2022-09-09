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

    this.initCalendar();

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

  initCalendar() {
    const formatOptions = {
      'dateFormat': 'd/m/y H:i',
      'enableTime': true,
      'time_24hr': true,
      'locale': {firstDayOfWeek: 1}
    };

    this.#startDateCalendar = flatpickr(this.startTimeView, formatOptions);
    this.#endDateCalendar = flatpickr(this.endTimeView, formatOptions);

    return this;
  }

  /**
   * @param {CalendarDate} date
   * @param {CalendarOptions} options
   */
  setStartDate(date, options = {}) {
    this.#startDateCalendar.setDate(date);
    this.#startDateCalendar.set(options);

    return this;
  }

  getStartDate() {
    return this.#startDateCalendar.selectedDates[0];
  }

  /**
   * @param {CalendarDate} date
   * @param {CalendarOptions} options
   */
  setEndDate(date, options = {}) {
    this.#endDateCalendar.setDate(date);
    this.#endDateCalendar.set(options);

    return this;
  }

  getEndDate() {
    return this.#endDateCalendar.selectedDates[0];
  }

  /**
   * Установит время начала
   * @param {string} isoDate
   */
  setStartTime(isoDate) {
    this.startTimeView.value = isoDate;

    return this;
  }

  /**
   * Установит время окончания
   * @param {string} isoDate
   */
  setEndTime(isoDate) {
    this.endTimeView.value = isoDate;

    return this;
  }
}

customElements.define(String(DatePickerView), DatePickerView);
