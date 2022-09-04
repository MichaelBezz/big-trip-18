import ComponentView, {html} from './component-view.js';
import TypeSelectView from './type-select-view.js';
import DestinationSelectView from './destination-select-view.js';
import DatePickerView from './date-picker-view.js';
import PriceInputView from './price-input-view.js';
import OfferSelectView from './offer-select-view.js';
import DestinationDetailsView from './destination-details-view.js';

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

  /** Откроет редактор точки (заменив на #linkedView) */
  open() {
    this.#linkedView.replaceWith(this);

    document.addEventListener('keydown', this.onDocumentKeydown);

    return this;
  }

  /** Закроет редактор точки (заменив на #linkedView) */
  close() {
    this.datePickerView.removeDatepicker();
    this.replaceWith(this.#linkedView);

    document.removeEventListener('keydown', this.onDocumentKeydown);

    return this;
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
   * @this {Document}
   * @param {KeyboardEvent} event
   */
  onDocumentKeydown(event) {
    // NOTE Событие без key при выборе опции в TypeSelectView
    if (!event.key?.startsWith('Esc')) {
      return;
    }

    event.preventDefault();

    /** @type {PointEditorView} */
    const editorView = document.querySelector(String(PointEditorView));
    editorView.close();
  }
}

customElements.define(String(PointEditorView), PointEditorView);
