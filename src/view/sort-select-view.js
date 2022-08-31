import ComponentView, {html} from './component-view.js';
import SortOptionView from './sort-option-view.js';

/** Представление списка сортировки */
export default class SortSelectView extends ComponentView {
  constructor() {
    super();

    /** @type {HTMLFormElement} */
    this.formView = this.querySelector('form.trip-sort');
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
   * Выберет сортировку
   * @param {string} sortType
   */
  select(sortType) {
    /** @type {HTMLInputElement} */
    (this.querySelector(`[value="sort-${sortType}"]`)).checked = true;

    return this;
  }

  /**
   * Установит пункты сортировки
   * @param {[string, string, boolean][]} states
   */
  setSortOptions(states) {
    const views = states.map((state) =>
      Object.assign(new SortOptionView(...state), {
        className: `trip-sort__item  trip-sort__item--${state[1]}`
      })
    );

    this.formView.append(...views);

    return this;
  }
}

customElements.define(String(SortSelectView), SortSelectView);
