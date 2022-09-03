/** @typedef {[src: string, alt: string]} DestinationPictureState */

import ComponentView, {html} from './component-view.js';

/** Представление описания пункта назначения */
export default class DestinationDetailsView extends ComponentView {
  constructor() {
    super();

    this.classList.add('event__section', 'event__section--destination');
  }

  /** @override */
  createAdjacentHtml() {
    return html`
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      <p class="event__destination-description"></p>
      <div class="event__photos-container">
        <div class="event__photos-tape">
          <!-- img.event__photo -->
        </div>
      </div>
    `;
  }

  /**
   * Установит описание
   * @param {string} description
   */
  setDescription(description) {
    this.querySelector('.event__destination-description').textContent = description;

    return this;
  }

  /**
   * Установит картинки
   * @param {DestinationPictureState[]} states
   */
  setPictures(states) {
    const views = states.map(([src, alt]) =>
      Object.assign(new Image(), {
        src,
        alt,
        className: 'event__photo'
      })
    );

    this.querySelector('.event__photos-tape').replaceChildren(...views);

    return this;
  }
}

customElements.define(String(DestinationDetailsView), DestinationDetailsView);
