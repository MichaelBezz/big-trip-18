import {html} from './view.js';
import PointCreatorView from './point-creator-view.js';

import SaveButtonLabel from '../enum/save-button-label.js';
import DeleteButtonLabel from '../enum/delete-button-label.js';

export default class PointEditorView extends PointCreatorView {
  constructor() {
    super();

    this.addEventListener('click', this.onClick);
  }

  /**
   * @override
   */
  createButtonsHtml() {
    return html`
      <button class="event__save-btn  btn  btn--blue" type="submit">
        ${SaveButtonLabel.DEFAULT}
      </button>
      <button class="event__reset-btn" type="reset">
        ${DeleteButtonLabel.DEFAULT}
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    `;
  }

  /**
   * @override
   * @param {boolean} flag
   */
  display(flag) {
    this.id = this.targetView?.id;

    (flag ? this.targetView : this).replaceWith(flag ? this : this.targetView);

    return this;
  }

  /**
   * @param {boolean} flag
   */
  setDeleting(flag) {
    /** @type {HTMLButtonElement} */
    const resetButtonView = this.querySelector('.event__reset-btn');

    resetButtonView.textContent = flag ? DeleteButtonLabel.PRESSED : DeleteButtonLabel.DEFAULT;

    this.setLoading(flag);
  }

  /**
   * @param {MouseEvent & {target: Element}} event
   */
  onClick(event) {
    if (event.target.closest('.event__rollup-btn')) {
      this.close();
    }
  }
}

customElements.define(String(PointEditorView), PointEditorView);
