import BaseView from './base-view.js';
import createOfferSelectedTemplate from './offer-selected-template.js';

/** Представление (выбранной) дополнительной опции */
export default class OfferSelectedView extends BaseView {
  constructor() {
    super();

    this.classList.add('event__offer');
  }

  /** @override */
  createTemplate() {
    return createOfferSelectedTemplate();
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

customElements.define('offer-selected', OfferSelectedView);
