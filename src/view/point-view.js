import ListItemView, {html} from './list-item-view.js';
import PointOfferView from './point-offer-view.js';

/**
 * @typedef PointState
 * @prop {number} id
 * @prop {string} date
 * @prop {string} startIsoDate
 * @prop {string} endIsoDate
 * @prop {string} icon
 * @prop {string} title
 * @prop {string} startTime
 * @prop {string} endTime
 * @prop {number} price
 * @prop {PointOfferState[]} offers
 */

/** Представление точки на маршруте */
export default class PointView extends ListItemView {
  #id;

  /**
   * @param {PointState} state
   */
  constructor(state) {
    super(state);

    this.#id = state.id;

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
   * Установит (выбранные) дополнительные опции
   * @param {PointOfferState[]} states
   */
  setOffers(states) {
    const views = states.map((state) => new PointOfferView(...state));

    this.querySelector('.event__selected-offers').replaceChildren(...views);

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
