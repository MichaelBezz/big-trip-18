import BaseView from './base-view.js';
import createOfferTemplate from './offer-template.js';

/** Дополнительная опция */
export default class OfferView extends BaseView {
  constructor() {
    super();
    this.classList.add('event__offer');
  }

  /** @override */
  createAdjacentHtml() {
    return createOfferTemplate();
  }

  /**
   * Устанавливает заголовок
   * @param {string} title
   */
  setTitle(title) {
    const titleOffer = this.querySelector('.event__offer-title');

    Object.assign(titleOffer, {textContent: title});

    return this;
  }

  /**
   * Устанавливает цену
   * @param {number} price
   */
  setPrice(price) {
    const priceOffer = this.querySelector('.event__offer-price');

    Object.assign(priceOffer, {textContent: price});

    return this;
  }
}

customElements.define('point-offer', OfferView);
