import ComponentView, {html} from './component-view.js';
import FilterOptionView from './filter-option-view.js';

/** Представление списка фильтров */
export default class FilterSelectView extends ComponentView {

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
   * @param {[string, string][]} states
   */
  setOptions(states) {
    const views = states.map((state) => new FilterOptionView(...state));

    this.querySelector('form').prepend(...views);

    return this;
  }

  /**
   * Выберет фильтр по типу
   * @param {string} filterType
   */
  select(filterType) {
    /** @type {HTMLInputElement} */
    (this.querySelector(`[value="${filterType}"]`)).checked = true;

    return this;
  }

  /**
   * Установит флаг disabled
   * @param {boolean[]} flags
   */
  setOptionsDisabled(flags) {
    const views = this.querySelectorAll('input');

    flags.forEach((flag, index) => {
      views[index].checked = flag;
    });

    return this;
  }
}

customElements.define(String(FilterSelectView), FilterSelectView);
