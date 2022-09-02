import ComponentView, {html} from './component-view.js';
import SortOptionView from './sort-option-view.js';

/** Представление списка сортировки */
export default class SortSelectView extends ComponentView {

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
   * @param {[string, string, ][]} states
   */
  setOptions(states) {
    const views = states.map((state) => new SortOptionView(...state));

    this.querySelector('form.trip-sort').append(...views);

    return this;
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
   * Установит флаг disabled
   * @param {boolean[]} flags
   */
  setOptionsDisabled(flags) {
    const views = this.querySelectorAll('input');

    flags.forEach((flag, index) => {
      views[index].disabled = flag;
    });

    return this;
  }
}

customElements.define(String(SortSelectView), SortSelectView);
