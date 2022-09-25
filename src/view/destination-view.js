import View, {html} from './view.js';
import './destination-view.css';

export default class DestinationView extends View {
  constructor() {
    super();

    this.classList.add('event__section', 'event__section--destination');
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description"></p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          <!-- Pictures -->
        </div>
      </div>
    `;
  }

  /**
   * @param  {DestinationPictureState} state
   */
  createPictureHtml(...state) {
    const [src, alt] = state;

    return html`
      <img class="event__photo" src="${src}" alt="${alt}">
    `;
  }

  /**
   * @param {DestinationPictureState[]} states
   */
  setPictures(states) {
    this.querySelector('.event__photos-tape').innerHTML = html`${
      states.map((state) => this.createPictureHtml(...state))
    }`;

    return this;
  }

  /**
   * @param {string} description
   */
  setDescription(description) {
    this.querySelector('.event__destination-description').textContent = description;

    return this;
  }
}

customElements.define(String(DestinationView), DestinationView);
