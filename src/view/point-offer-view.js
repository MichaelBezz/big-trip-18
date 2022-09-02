import ComponentView, {html} from './component-view.js';
import './point-offer-view.css';

/** Представление (выбранной) дополнительной опции */
export default class PointOfferView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__offer');
  }

  /**
   * @override
   * @param {string} title
   * @param {number} price
   */
  createAdjacentHtml(title, price) {
    return html`
      <span class="event__offer-title">${title}</span>
       &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    `;
  }
}

customElements.define(String(PointOfferView), PointOfferView);
