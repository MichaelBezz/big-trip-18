import View, {html} from './view.js';
import './offer-select-view.css';

/** Представление списка (доступных) опций в редакторе */
export default class OfferSelectView extends View {
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
    const [id, title, price] = state;

    return html`
      <div class="event__offer-selector">
        <input
          class="event__offer-checkbox  visually-hidden"
          id="event-offer-${id}"
          type="checkbox"
          name="event-offer"
          value="${id}"
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

  /**
   * @param {boolean[]} flags
   */
  setCheckedOptions(flags) {
    const inputViews = this.querySelectorAll('input');

    flags.forEach((flag, index) => {
      inputViews[index].checked = flag;
    });

    return this;
  }

  getCheckedValues() {
    /** @type {NodeListOf<HTMLInputElement>} */
    const checkedInputViews = this.querySelectorAll(':checked');

    return [...checkedInputViews].map((view) => view.value);
  }
}

customElements.define(String(OfferSelectView), OfferSelectView);
