import BaseView from './base-view.js';
import createPointTemplate from './point-template.js';

/** Точка на маршруте */
export default class PointView extends BaseView {

  /** @override */
  createAdjacentHtml() {
    return createPointTemplate(...arguments);
  }

  /**
   * Устанавливает дату
   * @param {string} date
   * @param {string} isoDate
   */
  setDate(date, isoDate) {
    return this.set('.event__date', {
      dateTime: isoDate,
      textContent: date
    });
  }

  /**
   * Устанавливает иконку
   * @param {string} type
   */
  setIcon(type) {
    return this.set('.event__type-icon', {src: `img/icons/${type}.png`});
  }

  /**
   * Устанавливает заголовок
   * @param {string} title
   */
  setTitle(title) {
    return this.set('.event__title', title);
  }

  /**
   * Устанавливает время начала
   * @param {string} time
   * @param {string} isoDate
   */
  setStartTime(time, isoDate) {
    return this.set('.event__start-time', {
      textContent: time,
      dateTime: isoDate
    });
  }

  /**
   * Устанавливает время окончания
   * @param {string} time
   * @param {string} isoDate
   */
  setEndTime(time, isoDate) {
    return this.set('.event__end-time', {
      textContent: time,
      dateTime: isoDate
    });
  }

  /**
   * Устанавливает цену
   * @param {number} price
   */
  setPrice(price) {
    return this.set('.event__price-value', {textContent: price});
  }
}

customElements.define('trip-point', PointView);
