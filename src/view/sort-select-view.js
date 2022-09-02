import RadioGroupView, {html} from './radio-group-view.js';
import SortOptionView from './sort-option-view.js';

/** Представление списка сортировки */
export default class SortSelectView extends RadioGroupView {

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
   * @param {[label: string, value: string][]} states
   */
  setOptions(states) {
    const views = states.map((state) => new SortOptionView(...state));

    this.querySelector('.trip-sort').append(...views);

    return this;
  }
}

customElements.define(String(SortSelectView), SortSelectView);
