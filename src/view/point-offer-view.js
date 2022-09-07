import ComponentView, {html} from './component-view.js';
import './point-offer-view.css';

/** @typedef {[title: string, price: number]} PointOfferState */

/** Представление (выбранной) дополнительной опции */
export default class PointOfferView extends ComponentView {
  /**
   * @param  {PointOfferState} state
   */
  constructor(...state) {
    super(...state);

    this.classList.add('event__offer');
  }

  /**
   * @override
   * @param {PointOfferState} state
   */
  createAdjacentHtml(...state) {
    const [title, price] = state;

    return html`
      <span class="event__offer-title">${title}</span>
       &plus;&euro;&nbsp;
      <span class="event__offer-price">${price}</span>
    `;
  }
}

customElements.define(String(PointOfferView), PointOfferView);
