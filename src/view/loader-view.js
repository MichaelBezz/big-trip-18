import View from './view.js';
import './loader-view.css';

export default class LoaderView extends View {
  constructor() {
    super();

    this.classList.add('loader');
  }

  /**
   * @override
   * @param {boolean} flag
   * @param {HTMLElement} rootView
   */
  display(flag, rootView = document.body) {
    rootView[flag ? 'append' : 'removeChild'](this);

    return this;
  }
}

customElements.define(String(LoaderView), LoaderView);
