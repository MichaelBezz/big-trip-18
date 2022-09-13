import PointCreatorView, {html} from './point-creator-view.js';

import ButtonState from '../enum/button-state.js';

/** Представление формы редактирования точки */
export default class PointEditorView extends PointCreatorView {
  constructor() {
    super();

    /** @type {HTMLButtonElement} */
    this.closeButtonView = this.querySelector('.event__rollup-btn');

    this.addEventListener('click', this.onClick);
  }

  /** @override */
  createButtonsHtml() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    `;
  }

  /** @override */
  connect() {
    this.targetView?.replaceWith(this);
  }

  /** @override */
  disconnect() {
    this.replaceWith(this.targetView);
  }

  disableResetButton() {
    this.resetButtonView.disabled = true;
    this.resetButtonView.textContent = ButtonState.RESET_PROCESS;
  }

  enableResetButton() {
    this.resetButtonView.disabled = false;
    this.resetButtonView.textContent = ButtonState.RESET_NORMAL;
  }

  /**
   * @param {MouseEvent & {target: Element}} event
   */
  onClick(event) {
    if (event.target === this.closeButtonView) {
      this.close();
    }
  }
}

customElements.define(String(PointEditorView), PointEditorView);
