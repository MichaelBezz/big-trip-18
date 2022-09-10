import ComponentView, {html} from './component-view.js';

export default class CreateButtonView extends ComponentView {
  constructor() {
    super();

    this.button = this.querySelector('button');
  }

  /** @override */
  createAdjacentHtml() {
    return html`
      <button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>
    `;
  }

  /**
   * @param {boolean} isDisabled
   */
  blockButton(isDisabled) {
    this.button.disabled = isDisabled;

    return this;
  }
}

customElements.define(String(CreateButtonView), CreateButtonView);
