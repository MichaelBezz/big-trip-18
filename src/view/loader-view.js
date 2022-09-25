import View from './view.js';
import './loader-view.css';

/**
 * @implements {EventListenerObject}
 */
export default class LoaderView extends View {
  constructor() {
    super();

    this.rootView = document.body;

    this.classList.add('loader');
  }

  /**
   * @override
   * @param {boolean} flag
   */
  display(flag) {
    this.rootView[flag ? 'append' : 'removeChild'](this);

    return this;
  }

  connectedCallback() {
    this.rootView.addEventListener('keydown', this);
  }

  disconnectedCallback() {
    this.rootView.removeEventListener('keydown', this);
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    event.preventDefault();
  }
}

customElements.define(String(LoaderView), LoaderView);
