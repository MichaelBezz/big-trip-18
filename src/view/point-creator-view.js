import PointItemView, {html} from './point-item-view.js';

import PointTypeSelectView from './point-type-select-view.js';
import DestinationSelectView from './destination-select-view.js';
import DatePickerView from './date-picker-view.js';
import PriceInputView from './price-input-view.js';
import OfferSelectView from './offer-select-view.js';
import DestinationView from './destination-view.js';

/** Представление формы создания точки */
export default class PointCreatorView extends PointItemView {
  constructor() {
    super();

    /** @type {Element} */
    this.targetView = null;

    /** @type {PointTypeSelectView} */
    this.pointTypeSelectView = this.querySelector(String(PointTypeSelectView));

    /** @type {DestinationSelectView} */
    this.destinationSelectView = this.querySelector(String(DestinationSelectView));

    /** @type {DatePickerView} */
    this.datePickerView = this.querySelector(String(DatePickerView));

    /** @type {PriceInputView} */
    this.priceInputView = this.querySelector(String(PriceInputView));

    /** @type {OfferSelectView} */
    this.offerSelectView = this.querySelector(String(OfferSelectView));

    /** @type {DestinationView} */
    this.destinationView = this.querySelector(String(DestinationView));

    /** @type {HTMLButtonElement} */
    this.submitButtonView = this.querySelector('.event__save-btn');

    /** @type {HTMLButtonElement} */
    this.resetButtonView = this.querySelector('.event__reset-btn');
  }

  /** @override */
  createAdjacentHtml() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${PointTypeSelectView}
          ${DestinationSelectView}
          ${DatePickerView}
          ${PriceInputView}
          ${this.createButtonsHtml()}
        </header>

        <section class="event__details">
          ${OfferSelectView}
          ${DestinationView}
        </section>
      </form>
    `;
  }

  createButtonsHtml() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    `;
  }

  /**
   * Назначит целевой элемент
   * @param {Element} view
   */
  target(view) {
    this.targetView = view;

    return this;
  }

  /** Метод подключения view */
  connect() {
    this.targetView.prepend(this);
  }

  /** Метод отключения view */
  disconnect() {
    this.remove();
  }

  /**
   * Подключит view
   * Обработает события по Esc
   */
  open() {
    this.connect();

    document.addEventListener('keydown', this);

    return this;
  }

  /**
   * Отключит view
   * Удалит события по Esc
   * При необходимости создаст событие close
   * @param {boolean} dispatch
   */
  close(dispatch = false) {
    this.disconnect();

    document.removeEventListener('keydown', this);

    if (!dispatch) {
      this.dispatchEvent(new CustomEvent('close'));
    }

    return this;
  }

  /**
   * NOTE Стандартный метод обработки события на объекте
   * NOTE Событие без key при выборе опции в PointTypeSelectView
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (!event.key?.startsWith('Esc')) {
      return;
    }

    event.preventDefault();

    this.close();
  }
}

customElements.define(String(PointCreatorView), PointCreatorView);
