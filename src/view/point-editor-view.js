import ComponentView, {html} from './component-view.js';
import TypeSelectView from './type-select-view.js';
import DestinationInputView from './destination-input-view.js';

/** Представление формы редактирования точки */
export default class PointEditorView extends ComponentView {
  #linkedView = null;

  constructor() {
    super();

    /** @type {TypeSelectView} */
    this.typeSelectView = this.querySelector(String(TypeSelectView));

    /** @type {DestinationInputView} */
    this.destinationInputView = this.querySelector(String(DestinationInputView));

    this.querySelector('.event__rollup-btn').addEventListener('click', () => {
      this.close();
    });
  }

  /** @override */
  createAdjacentHtml() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${TypeSelectView}
          ${DestinationInputView}

          TODO <!-- Представление date-picker -->
          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="18/03/19 12:25">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="18/03/19 13:35">
          </div>

          TODO <!-- Представление price-input -->
          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </header>
        <section class="event__details">

          TODO <!-- Представление offers-select -->
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>

            <div class="event__available-offers"></div>
          </section>

          TODO <!-- Представление destination-details -->
          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">Chamonix-Mont-Blanc (usually shortened to Chamonix) is a resort area near the junction of France, Switzerland and Italy. At the base of Mont Blanc, the highest summit in the Alps, it's renowned for its skiing.</p>
          </section>
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
   * @returns Откроет редактор точки (заменив на #linkedView)
   */
  open() {
    this.#linkedView.replaceWith(this);

    document.addEventListener('keydown', this);

    return this;
  }

  /**
   * Закроет редактор точки (заменив на #linkedView)
   */
  close() {
    this.replaceWith(this.#linkedView);

    document.removeEventListener('keydown', this);

    return this;
  }

  /**
   * Установит иконку
   * @param {PointType} type
   */
  setIcon(type) {
    const iconView = this.querySelector('.event__type-icon');

    Object.assign(iconView, {src: `img/icons/${type}.png`});

    return this;
  }

  /**
   * Установит тип
   * @param {PointType} type
   */
  setType(type) {
    const typeView = this.querySelector('.event__type-output');

    Object.assign(typeView, {textContent: type});

    return this;
  }

  /**
   * Установит пункт назначения
   * @param {string} destination
   */
  setDestination(destination) {
    const destinationView = this.querySelector('.event__input--destination');

    Object.assign(destinationView, {value: destination});

    return this;
  }

  /**
   * Установит время начала
   * @param {string} isoDate
   */
  setStartTime(isoDate) {
    const startTimeView = this.querySelector('[name="event-start-time"]');

    Object.assign(startTimeView, {value: isoDate});

    return this;
  }

  /**
   * Установит время окончания
   * @param {string} isoDate
   */
  setEndTime(isoDate) {
    const endTimeView = this.querySelector('[name="event-end-time"]');

    Object.assign(endTimeView, {value: isoDate});

    return this;
  }

  /**
   * Установит цену
   * @param {number} price
   */
  setPrice(price) {
    const priceView = this.querySelector('.event__input--price');

    Object.assign(priceView, {value: price});

    return this;
  }

  /**
   * Установит описание
   * @param {string} description
   */
  setDescription(description) {
    const descriptionView = this.querySelector('.event__destination-description');

    Object.assign(descriptionView, {textContent: description});

    return this;
  }

  /**
   * Заменит дополнительные опции
   * @param {...HTMLElement} offerViews
   */
  replaceOffers(...offerViews) {
    const availableOffersView = this.querySelector('.event__available-offers');

    availableOffersView.replaceChildren(...offerViews);

    return this;
  }

  /**
   * Обработает событие по нажатию на клавишу Esc
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }
}

customElements.define(String(PointEditorView), PointEditorView);
