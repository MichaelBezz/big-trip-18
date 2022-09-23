import initCalendar from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import View, {html} from './view.js';

import KeyboardCommand from '../enum/keyboard-command.js';

/** Представление даты и времени */
export default class DatePickerView extends View {
  /** @type {Calendar} */
  #startDateCalendar;

  /** @type {Calendar} */
  #endDateCalendar;

  constructor() {
    super();

    this.#startDateCalendar = initCalendar(this.querySelector('#event-start-time-1'));
    this.#endDateCalendar = initCalendar(this.querySelector('#event-end-time-1'));

    this.classList.add('event__field-group', 'event__field-group--time');

    this.addEventListener('keydown', this.onKeydown, true);
  }

  get disallowedKeys() {
    return ['Backspace', 'Delete'];
  }

  get isOpen() {
    return this.#startDateCalendar.isOpen || this.#endDateCalendar.isOpen;
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
  setDates(startDate, endDate = startDate, notify = true) {
    this.#startDateCalendar.setDate(startDate, notify);
    this.#endDateCalendar.setDate(endDate, notify);

    return this;
  }

  getDates() {
    return [
      this.#startDateCalendar.selectedDates[0]?.toJSON(),
      this.#endDateCalendar.selectedDates[0]?.toJSON()
    ];
  }

  close() {
    this.#startDateCalendar.close();
    this.#endDateCalendar.close();
  }

  /**
   * @param {KeyboardEvent} event
   */
  onKeydown(event) {
    if (this.disallowedKeys.includes(event.key)) {
      event.stopPropagation();

      return;
    }

    if (KeyboardCommand.EXIT.includes(event.key) && this.isOpen) {
      event.stopPropagation();

      this.close();
    }
  }

  /**
   * @param {CalendarOptions} options
   */
  static setDefaults(options) {
    initCalendar.setDefaults(options);
  }
}

customElements.define(String(DatePickerView), DatePickerView);
