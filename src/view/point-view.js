import View, {html} from './view.js';
import './point-view.css';

export default class PointView extends View {
  #id;

  /**
   * @param {PointState} state
   */
  constructor(state) {
    super(state);

    this.#id = state.id;
    this.id = `${this.constructor}-${state.id}`;

    this.classList.add('trip-events__item');

    this.addEventListener('click', this.onClick);
  }

  /**
   * @override
   * @param {PointState} state
   */
  createAdjacentHtml(state) {
    return html`
      <div class="event">
        <time class="event__date" datetime="${state.startIsoDate}">${state.date}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${state.icon}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${state.title}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${state.startIsoDate}">${state.startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${state.endIsoDate}">${state.endTime}</time>
          </p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${state.price}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <div class="event__selected-offers">
          ${state.offers.map(([title, price]) => html`
            <div class="event__offer">
              <span class="event__offer-title">${title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${price}</span>
            </div>
          `)}
        </div>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    `;
  }

  getId() {
    return this.#id;
  }

  /**
   * @param {Event & {target: HTMLButtonElement}} event
   */
  onClick(event) {
    if (!event.target.closest('.event__rollup-btn')) {
      return;
    }

    this.dispatchEvent(new CustomEvent('point-edit', {bubbles: true}));
  }

  /**
   * @param {string} id
   * @param {Document | Element} rootView
   * @return {PointView}
   */
  static findById(id, rootView = document) {
    return rootView.querySelector(`#${this}-${id}`);
  }
}

customElements.define(String(PointView), PointView);
