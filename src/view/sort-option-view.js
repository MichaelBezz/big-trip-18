import ComponentView, {html} from './component-view.js';

/** Представление пункта сортировки */
export default class SortOptionView extends ComponentView {
  /**
   * @override
   * @param {string} label
   * @param {string} value
   * @param {boolean} isDisabled
   */
  createAdjacentHtml(label, value, isDisabled) {
    return html`
      <input
        id="sort-${value}"
        class="trip-sort__input  visually-hidden"
        type="radio"
        name="trip-sort"
        value="sort-${value}"
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-sort__btn" for="sort-${value}">
        ${label}
      </label>
    `;
  }
}

customElements.define(String(SortOptionView), SortOptionView);
