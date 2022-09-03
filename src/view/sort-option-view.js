/** @typedef {[label: string, value: string]} SortOptionState */

import ComponentView, {html} from './component-view.js';

/** Представление пункта сортировки */
export default class SortOptionView extends ComponentView {
  /**
   * @param {SortOptionState} state
   */
  constructor(...state) {
    const [label, value] = state;

    super(label, value);

    this.classList.add('trip-sort__item',`trip-sort__item--${value}`);
  }

  /**
   * @override
   * @param {SortOptionState} state
   */
  createAdjacentHtml(...state) {
    const [label, value] = state;

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
