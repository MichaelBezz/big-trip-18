import BaseView from './base-view.js';
import createPointTemplate from './point-template.js';

/** Представление точки на маршруте */
export default class PointView extends BaseView {
  constructor() {
    super();

    this.querySelector('.event__rollup-btn').addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('expand'));
    });
  }

  /** @override */
  createAdjacentHtml() {
    return createPointTemplate();
  }

  /**
   * Установит дату
   * @param {string} date
   * @param {string} isoDate
   */
  setDate(date, isoDate) {
    const datePoint = this.querySelector('.event__date');

    Object.assign(datePoint, {
      dateTime: isoDate,
      textContent: date
    });

    return this;
  }

  /**
   * Установит иконку
   * @param {OfferType} type
   */
  setIcon(type) {
    const iconPoint = this.querySelector('.event__type-icon');

    Object.assign(iconPoint, {src: `img/icons/${type}.png`});

    return this;
  }

  /**
   * Установит заголовок
   * @param {string} title
   */
  setTitle(title) {
    const titlePoint = this.querySelector('.event__title');

    Object.assign(titlePoint, {textContent: title});

    return this;
  }

  /**
   * Установит время начала
   * @param {string} time
   * @param {string} isoDate
   */
  setStartTime(time, isoDate) {
    const startTimePoint = this.querySelector('.event__start-time');

    Object.assign(startTimePoint, {
      dateTime: isoDate,
      textContent: time
    });

    return this;
  }

  /**
   * Установит время окончания
   * @param {string} time
   * @param {string} isoDate
   */
  setEndTime(time, isoDate) {
    const endTimePoint = this.querySelector('.event__end-time');

    Object.assign(endTimePoint, {
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
    const pricePoint = this.querySelector('.event__price-value');

    Object.assign(pricePoint, {textContent: price});

    return this;
  }

  /**
   * Заменит дополнительные опции
   * @param {...HTMLElement} offerViews
   */
  replaceOffers(...offerViews) {
    this.querySelector('.event__selected-offers').replaceChildren(...offerViews);

    return this;
  }
}

customElements.define('trip-point', PointView);
