import RadioGroupView, {html} from './radio-group-view.js';
import FilterOptionView from './filter-option-view.js';

/** Представление списка фильтров */
export default class FilterSelectView extends RadioGroupView {
  /** @override */
  createAdjacentHtml() {
    return html`
      <form class="trip-filters" action="#" method="get">
        <!-- FilterOptionView -->
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    `;
  }

  /**
   * Установит фильтры
   * @param {FilterOptionState[]} states
   */
  setOptions(states) {
    const views = states.map((state) => new FilterOptionView(...state));

    this.querySelector('form').prepend(...views);

    return this;
  }
}

customElements.define(String(FilterSelectView), FilterSelectView);
