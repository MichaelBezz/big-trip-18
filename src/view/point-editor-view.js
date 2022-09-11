import ComponentView, {html} from './component-view.js';
import TypeSelectView from './type-select-view.js';
import DestinationSelectView from './destination-select-view.js';
import DatePickerView from './date-picker-view.js';
import PriceInputView from './price-input-view.js';
import OfferSelectView from './offer-select-view.js';
import DestinationDetailsView from './destination-details-view.js';

const SaveStates = {
  NORMAL: 'Save',
  PROCESS: 'Saving...'
};

const DeleteStates = {
  NORMAL: 'Delete',
  PROCESS: 'Deleting...'
};

/** Представление формы редактирования точки */
export default class PointEditorView extends ComponentView {
  #linkedView = null;

  constructor() {
    super();

    /** @type {TypeSelectView} */
    this.typeSelectView = this.querySelector(String(TypeSelectView));

    /** @type {DestinationSelectView} */
    this.destinationSelectView = this.querySelector(String(DestinationSelectView));

    /** @type {DatePickerView} */
    this.datePickerView = this.querySelector(String(DatePickerView));

    /** @type {PriceInputView} */
    this.priceInputView = this.querySelector(String(PriceInputView));

    /** @type {OfferSelectView} */
    this.offerSelectView = this.querySelector(String(OfferSelectView));

    /** @type {DestinationDetailsView} */
    this.destinationDetailsView = this.querySelector(String(DestinationDetailsView));

    /** @type {HTMLButtonElement} */
    this.saveButton = this.querySelector('.event__save-btn');

    /** @type {HTMLButtonElement} */
    this.deleteButton = this.querySelector('.event__reset-btn');

    this.classList.add('trip-events__item');
    this.addEventListener('click', this.onClick);
  }

  /** @override */
  createAdjacentHtml() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${TypeSelectView}
          ${DestinationSelectView}
          ${DatePickerView}
          ${PriceInputView}
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>

        <section class="event__details">
          ${OfferSelectView}
          ${DestinationDetailsView}
        </section>
      </form>
    `;
  }

  /**
   * Свяжет редактор с другим представлением
   * @param {HTMLElement} view
   */
  link(view) {
    this.#linkedView = view;

    return this;
  }

  /**
   * Заменит #linkedView на PointEditorView
   * Обработает события по Esc
   */
  open() {
    this.#linkedView.replaceWith(this);
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
    this.replaceWith(this.#linkedView);
    document.removeEventListener('keydown', this);

    if (!dispatch) {
      this.dispatchEvent(new CustomEvent('close'));
    }

    return this;
  }

  disableSaveButton() {
    this.saveButton.disabled = true;
    this.saveButton.textContent = SaveStates.PROCESS;
  }

  enableSaveButton() {
    this.saveButton.disabled = false;
    this.saveButton.textContent = SaveStates.NORMAL;
  }

  disableDeleteButton() {
    this.deleteButton.disabled = true;
    this.deleteButton.textContent = DeleteStates.PROCESS;
  }

  enableDeleteButton() {
    this.deleteButton.disabled = false;
    this.deleteButton.textContent = DeleteStates.NORMAL;
  }

  /**
   * @param {MouseEvent & {target: Element}} event
   */
  onClick(event) {
    if (event.target.closest('.event__rollup-btn')) {
      this.close();
    }
  }

  /**
   * NOTE Стандартный метод обработки события на объекте
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    // NOTE Событие без key при выборе опции в TypeSelectView
    if (!event.key?.startsWith('Esc')) {
      return;
    }

    event.preventDefault();
    this.close();
  }
}

customElements.define(String(PointEditorView), PointEditorView);
