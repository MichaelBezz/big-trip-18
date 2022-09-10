import ComponentView, {html} from './component-view.js';
import './offer-select-view.css';

/** @typedef {[id: number, title: string, price: number, isChecked: boolean]} OfferOptionState */

/** Представление списка (доступных) опций в редакторе */
export default class OfferSelectView extends ComponentView {
  constructor() {
    super();

    this.classList.add('event__section', 'event__section--offers');
  }

  /** @override */
  createAdjacentHtml() {
    return html`
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
      <div class="event__available-offers">
        <!-- OfferOptionView -->
      </div>
    `;
  }

  /**
   * @param  {OfferOptionState} state
   */
  createOptionHtml(...state) {
    const [id, title, price, isChecked] = state;

    return html`
      <div class="event__offer-selector">
        <input
          class="event__offer-checkbox  visually-hidden"
          id="event-offer-${id}"
          type="checkbox"
          name="event-offer-${id}"
          ${isChecked ? 'checked' : ''}
        >
        <label class="event__offer-label" for="event-offer-${id}">
          <span class="event__offer-title">${title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${price}</span>
        </label>
      </div>
    `;
  }

  /**
   * Установит доступные опции
   * @param {OfferOptionState[]} states
   */
  setOptions(states) {
    this.querySelector('.event__available-offers').innerHTML = html`${
      states.map((state) => this.createOptionHtml(...state))
    }`;

    return this;
  }
}

customElements.define(String(OfferSelectView), OfferSelectView);
