import ComponentView, {html} from './component-view.js';

/** @typedef {[id: number, title: string, price: number, isChecked: boolean]} OfferOptionState */

/** Представление (доступной) дополнительной опции в редакторе */
export default class OfferOptionView extends ComponentView {
  /**
   * @param  {OfferOptionState} state
   */
  constructor(...state) {
    super(...state);

    this.classList.add('event__offer-selector');
  }

  /**
   * @override
   * @param {OfferOptionState} state
   */
  createAdjacentHtml(...state) {
    const [id, title, price, isChecked] = state;

    return html`
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
    `;
  }
}

customElements.define(String(OfferOptionView), OfferOptionView);
