import ComponentView, {html} from './component-view.js';

/** Представление пункта сортировки */
export default class SortOptionView extends ComponentView {
  /**
   * @param {string} label
   * @param {string} value
   */
  constructor(label, value) {
    super(label, value);

    this.classList.add('trip-sort__item',`trip-sort__item--${value}`);
  }

  /**
   * @override
   * @param {string} label
   * @param {string} value
   */
  createAdjacentHtml(label, value) {
    return html`
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
    `;
  }
}

customElements.define(String(SortOptionView), SortOptionView);
