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
    const dateView = this.querySelector('.event__date');

    Object.assign(dateView, {
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
    const iconView = this.querySelector('.event__type-icon');

    Object.assign(iconView, {src: `img/icons/${type}.png`});

    return this;
  }

  /**
   * Установит заголовок
   * @param {string} title
   */
  setTitle(title) {
    const titleView = this.querySelector('.event__title');

    Object.assign(titleView, {textContent: title});

    return this;
  }

  /**
   * Установит время начала
   * @param {string} time
   * @param {string} isoDate
   */
  setStartTime(time, isoDate) {
    const startTimeView = this.querySelector('.event__start-time');

    Object.assign(startTimeView, {
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
    const endTimeView = this.querySelector('.event__end-time');

    Object.assign(endTimeView, {
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
    const priceView = this.querySelector('.event__price-value');

    Object.assign(priceView, {textContent: price});

    return this;
  }

  /**
   * Заменит дополнительные опции
   * @param {...HTMLElement} offerViews
   */
  replaceOffers(...offerViews) {
    const selectedOffersView = this.querySelector('.event__selected-offers');

    selectedOffersView.replaceChildren(...offerViews);

    return this;
  }
}

customElements.define('route-point', PointView);
