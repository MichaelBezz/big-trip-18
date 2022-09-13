import ItemView, {html} from './item-view.js';

/** Представление точки на маршруте */
export default class PointView extends ItemView {
  #id;

  /**
   * @param {PointState} state
   */
  constructor(state) {
    super(state);

    this.#id = state.id;
    this.id = `point-${state.id}`;

    this.setOffers(state.offers);
    this.addEventListener('click', this.onClick);
  }

  /**
   * @override
   * @param {PointState} state
   */
  createAdjacentHtml(state) {
    const {date, startIsoDate, endIsoDate, icon, title, startTime, endTime, price} = state;

    return html`
      <div class="event">
        <time class="event__date" datetime="${startIsoDate}">${date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${icon}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${title}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${startIsoDate}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${endIsoDate}">${endTime}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <div class="event__selected-offers">
          <!-- PointOfferView -->
        </div>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    `;
  }

  /**
   * @param  {PointOfferState} state
   */
  createOfferHtml(...state) {
    const [title, price] = state;

    return html`
      <div class="event__offer">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </div>
    `;
  }

  /**
   * Установит (выбранные) дополнительные опции
   * @param {PointOfferState[]} states
   */
  setOffers(states) {
    this.querySelector('.event__selected-offers').innerHTML = html`${
      states.map((state) => this.createOfferHtml(...state))
    }`;

    return this;
  }

  /**
   * @param {Event & {target: HTMLButtonElement}} event
   */
  onClick(event) {
    if (!event.target.closest('.event__rollup-btn')) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent('point-edit', {
        detail: this.#id,
        bubbles: true
      })
    );
  }
}

customElements.define(String(PointView), PointView);
