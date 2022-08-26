import ComponentView, {html} from './component-view.js';

/** Представление (выбранной) дополнительной опции */
export default class PointOfferView extends ComponentView {
  constructor() {
    super();

    this.classList.add('event__offer');
  }

  /** @override */
  createAdjacentHtml() {
    return html`
      <span class="event__offer-title"></span>
       &plus;&euro;&nbsp;
      <span class="event__offer-price"></span>
    `;
  }

  /**
   * Установит заголовок
   * @param {string} title
   */
  setTitle(title) {
    this.querySelector('.event__offer-title').textContent = title;

    return this;
  }

  /**
   * Установит цену
   * @param {number} price
   */
  setPrice(price) {
    this.querySelector('.event__offer-price').textContent = price;

    return this;
  }
}

customElements.define(String(PointOfferView), PointOfferView);
