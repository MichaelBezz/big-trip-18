import RadioGroupView, {html} from './radio-group-view.js';
import SortOptionView from './sort-option-view.js';

/** Представление списка сортировки */
export default class SortSelectView extends RadioGroupView {
  /** @type {HTMLElement} */
  #container;

  constructor() {
    super();

    this.#container = document.querySelector('.trip-events h2');
    this.#container.after(this);

    this.addEventListener('change', this.onChange);
  }

  /** @override */
  createAdjacentHtml() {
    return html`
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <!-- SortOptionView -->
      </form>
    `;
  }

  /**
   * Установит пункты сортировки
   * @param {SortOptionState[]} states
   */
  setOptions(states) {
    const views = states.map((state) => new SortOptionView(...state));

    this.querySelector('.trip-sort').append(...views);

    return this;
  }

  /**
   * @param {Event & {target: HTMLInputElement}} event
   */
  onChange(event) {
    if (event.target.type !== 'radio') {
      return;
    }

    this.dispatchEvent(new CustomEvent('sort-change'));
  }
}

customElements.define(String(SortSelectView), SortSelectView);
