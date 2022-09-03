import ComponentView, {html} from './component-view.js';
import PointOfferView from './point-offer-view.js';
import './point-view.css';

/** Представление точки на маршруте */
export default class PointView extends ComponentView {
  #id = null;

  /**
   * @param {number} id
   */
  constructor(id) {
    super();

    this.#id = id;

    this.classList.add('trip-events__item');
    this.addEventListener('click', this.onClick);
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
          <!-- PointOffer -->
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
   * @param {string} type
   */
  setIcon(type) {
    /** @type {HTMLImageElement} */
    (this.querySelector('.event__type-icon')).src = `img/icons/${type}.png`;

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
    this.querySelector('.event__price-value').textContent = String(price);

    return this;
  }

  /**
   * Установит (выбранные) дополнительные опции
   * @param {PointOfferState[]} states
   */
  setOffers(states) {
    const views = states.map((state) => new PointOfferView(...state));

    this.querySelector('.event__selected-offers').replaceChildren(...views);

    return this;
  }

  /**
   * @param {Event & {target: HTMLButtonElement}} event
   */
  onClick(event) {
    if (!event.target.closest('.event__rollup-btn')) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('point-edit', {
        detail: this.#id,
        bubbles: true
      })
    );
  }
}

customElements.define(String(PointView), PointView);
