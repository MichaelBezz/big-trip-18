import BaseView from './base-view.js';
import createOfferTemplate from './offer-template.js';

/** Представление (доступной) дополнительной опции в редакторе */
export default class OfferView extends BaseView {
  constructor() {
    super();

    this.classList.add('event__offer-selector');
  }

  /** @override */
  createAdjacentHtml() {
    return createOfferTemplate();
  }

  /**
   * Установит заголовок
   * @param {string} title
   */
  setTitle(title) {
    const titleView = this.querySelector('.event__offer-title');

    Object.assign(titleView, {textContent: title});

    return this;
  }

  /**
   * Установит цену
   * @param {number} price
   */
  setPrice(price) {
    const priceView = this.querySelector('.event__offer-price');

    Object.assign(priceView, {textContent: price});

    return this;
  }
}

customElements.define('offer-available', OfferView);
