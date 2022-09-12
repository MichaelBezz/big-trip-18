import RadioGroupView, {html} from './radio-group-view.js';

/** @typedef {[label: string, value: string]} SortOptionState */

/** Представление списка сортировки */
export default class SortView extends RadioGroupView {

  /** @override */
  createAdjacentHtml() {
    return html`
      <form class="trip-events__trip-sort  trip-sort" action="#" method="get">
        <!-- SortOptionView -->
      </form>
    `;
  }

  /**
   * @param {SortOptionState} state
   */
  createOptionHtml(...state) {
    const [label, value] = state;

    return html`
      <div class="trip-sort__item  trip-sort__item--${value}">
        <input
        id="sort-${value}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="${value}"
        >
        <label class="trip-sort__btn" for="sort-${value}">
          ${label}
        </label>
      </div>
    `;
  }

  /**
   * Установит пункты сортировки
   * @param {SortOptionState[]} states
   */
  setOptions(states) {
    this.querySelector('.trip-sort').insertAdjacentHTML('afterbegin', html`${
      states.map((state) => this.createOptionHtml(...state))
    }`);

    return this;
  }
}

customElements.define(String(SortView), SortView);
