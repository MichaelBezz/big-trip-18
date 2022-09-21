import PointItemView, {html} from './point-item-view.js';

import LoaderView from './loader-view.js';
import PointTypeSelectView from './point-type-select-view.js';
import DestinationSelectView from './destination-select-view.js';
import DatePickerView from './date-picker-view.js';
import PriceInputView from './price-input-view.js';
import OfferSelectView from './offer-select-view.js';
import DestinationView from './destination-view.js';

import SaveButtonLabel from '../enum/save-button-label.js';

export * from './point-item-view.js';

/** Представление формы создания точки */
export default class PointCreatorView extends PointItemView {
  constructor() {
    super();

    /** @type {Element} */
    this.targetView = null;

    /** @type {LoaderView} */
    this.loaderView = new LoaderView();

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

    /** @type {HTMLFormElement} */
    this.formView = this.querySelector('form');
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
      <button class="event__save-btn  btn  btn--blue" type="submit">
        ${SaveButtonLabel.DEFAULT}
      </button>
      <button class="event__reset-btn" type="reset">
        Cancel
      </button>
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

  /**
   * @override
   * @param {boolean} flag
   */
  display(flag) {
    if (flag) {
      this.targetView?.prepend(this);
    } else {
      this.remove();
    }

    return this;
  }

  /**
   * Подключит view
   * Обработает события по Esc
   */
  open() {
    this.display(true);

    document.addEventListener('keydown', this);

    return this;
  }

  /**
   * Отключит view
   * Удалит события по Esc
   * При необходимости создаст событие close
   * @param {boolean} notify
   */
  close(notify = false) {
    this.display(false);

    document.removeEventListener('keydown', this);

    if (!notify) {
      this.dispatchEvent(new CustomEvent('close'));
    }

    return this;
  }

  /**
   * @param {boolean} flag
   */
  setLoading(flag) {
    this.loaderView.display(flag);

    [...this.formView].forEach((/** @type {HTMLFormElement} */view) => {
      view.disabled = flag;
    });
  }

  /**
   * @param {boolean} flag
   */
  setSavingState(flag) {
    /** @type {HTMLButtonElement} */
    const submitButtonView = this.querySelector('.event__save-btn');
    submitButtonView.textContent = flag ? SaveButtonLabel.PRESSED : SaveButtonLabel.DEFAULT;

    this.setLoading(flag);
  }

  get closeKeys() {
    return ['Escape', 'Esc'];
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (!this.closeKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();

    this.close();
  }
}

customElements.define(String(PointCreatorView), PointCreatorView);
