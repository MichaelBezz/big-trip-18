import ComponentView from './component-view.js';
import OfferItemView from './offer-item-view.js';

export default class OfferListView extends ComponentView {
  constructor() {
    super(...arguments);

    this.classList.add('event__selected-offers');
  }

  /**
   * Установит (выбранные) дополнительные опции
   * @param {[string, number][]} states
   */
  setOffers(states) {
    const views = states.map((state) => new OfferItemView(...state));

    this.replaceChildren(...views);

    return this;
  }


}

customElements.define(String(OfferListView), OfferListView);
