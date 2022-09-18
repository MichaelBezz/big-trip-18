import View, {html} from './view.js';

import initCalendar from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

/** Представление даты и времени */
export default class DatePickerView extends View {
  /** @type {Calendar} */
  #startDateCalendar;

  /** @type {Calendar} */
  #endDateCalendar;

  constructor() {
    super();

    this.#startDateCalendar = initCalendar(this.querySelector('[name="event-start-time"]'));
    this.#endDateCalendar = initCalendar(this.querySelector('[name="event-end-time"]'));

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
   * @param {CalendarOptions} startDateOptions
   * @param {CalendarOptions} endDateOptions
   */
  configure(startDateOptions, endDateOptions = startDateOptions) {
    this.#startDateCalendar.set(startDateOptions);
    this.#endDateCalendar.set(endDateOptions);

    return this;
  }

  /**
   * @param {CalendarDate} startDate
   * @param {CalendarDate} endDate
   */
  setDate(startDate, endDate = startDate) {
    this.#startDateCalendar.setDate(startDate, true);
    this.#endDateCalendar.setDate(endDate, true);

    return this;
  }

  getDates() {
    return [
      this.#startDateCalendar.selectedDates[0]?.toJSON(),
      this.#endDateCalendar.selectedDates[0]?.toJSON()
    ];
  }

  /**
   * @param {CalendarOptions} options
   */
  static setDefaults(options) {
    initCalendar.setDefaults(options);
  }
}

customElements.define(String(DatePickerView), DatePickerView);
