import ComponentView, {html} from './component-view.js';

/** Представление точки на маршруте */
export default class PointView extends ComponentView {
  constructor() {
    super();

    this.querySelector('.event__rollup-btn').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent(':expand'));
    });
  }

  /** @override */
  createAdjacentHtml() {
    return html`
      <div class="event">
        <time class="event__date" datetime=""></time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="" alt="Event type icon">
        </div>
        <h3 class="event__title"></h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime=""></time>
            &mdash;
            <time class="event__end-time" datetime=""></time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value"></span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <div class="event__selected-offers">
          <!-- PointOfferView -->
        </div>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    `;
  }

  /**
   * Установит дату
   * @param {string} date
   * @param {string} isoDate
   */
  setDate(isoDate, date) {
    const view = this.querySelector('.event__date');

    Object.assign(view, {
      dateTime: isoDate,
      textContent: date
    });

    return this;
  }

  /**
   * Установит иконку
   * @param {PointType} type
   */
  setIcon(type) {
    this.querySelector('.event__type-icon').src = `img/icons/${type}.png`;

    return this;
  }

  /**
   * Установит заголовок
   * @param {string} title
   */
  setTitle(title) {
    this.querySelector('.event__title').textContent = title;

    return this;
  }

  /**
   * Установит время начала
   * @param {string} isoDate
   * @param {string} time
   */
  setStartTime(isoDate, time) {
    const view = this.querySelector('.event__start-time');

    Object.assign(view, {
      dateTime: isoDate,
      textContent: time
    });

    return this;
  }

  /**
   * Установит время окончания
   * @param {string} isoDate
   * @param {string} time
   */
  setEndTime(isoDate, time) {
    const view = this.querySelector('.event__end-time');

    Object.assign(view, {
      dateTime: isoDate,
      textContent: time
    });

    return this;
  }

  /**
   * Установит цену
   * @param {number} price
   */
  setPrice(price) {
    this.querySelector('.event__price-value').textContent = price;

    return this;
  }

  /**
   * Заменит дополнительные опции
   * @param {...HTMLElement} offerViews
   */
  replaceOffers(...offerViews) {
    this.querySelector('.event__selected-offers')
      .replaceChildren(...offerViews);

    return this;
  }
}

customElements.define(String(PointView), PointView);
