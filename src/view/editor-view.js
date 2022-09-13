import View, {html} from './view.js';
import PointTypeSelectView from './point-type-select-view.js';
import DestinationSelectView from './destination-select-view.js';
import DatePickerView from './date-picker-view.js';
import PriceInputView from './price-input-view.js';
import OfferSelectView from './offer-select-view.js';
import DestinationView from './destination-view.js';

const SaveButtonStates = {
  NORMAL: 'Save',
  PROCESS: 'Saving...'
};

const DeleteButtonStates = {
  NORMAL: 'Delete',
  PROCESS: 'Deleting...'
};

/** Представление формы редактирования точки */
export default class EditorView extends View {
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

    /** @type {HTMLButtonElement} */
    this.closeButtonView = this.querySelector('.event__rollup-btn');

    this.addEventListener('click', this.onClick);
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
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
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

  connect() {
    this.targetView.replaceWith(this);
  }

  disconnect() {
    this.replaceWith(this.targetView);
  }

  /**
   * Заменит #linkedView на PointEditorView
   * Обработает события по Esc
   */
  open() {
    this.connect();

    document.addEventListener('keydown', this);

    return this;
  }

  /**
   * Заменит PointEditorView на #linkedView
   * Удалит события по Esc
   * При необходимости добавит отправит close
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

  disableSaveButton() {
    this.submitButtonView.disabled = true;
    this.submitButtonView.textContent = SaveButtonStates.PROCESS;
  }

  enableSaveButton() {
    this.submitButtonView.disabled = false;
    this.submitButtonView.textContent = SaveButtonStates.NORMAL;
  }

  disableDeleteButton() {
    this.resetButtonView.disabled = true;
    this.resetButtonView.textContent = DeleteButtonStates.PROCESS;
  }

  enableDeleteButton() {
    this.resetButtonView.disabled = false;
    this.resetButtonView.textContent = DeleteButtonStates.NORMAL;
  }

  /**
   * @param {MouseEvent & {target: Element}} event
   */
  onClick(event) {
    if (event.target === this.closeButtonView) {
      this.close();
    }
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

customElements.define(String(EditorView), EditorView);
