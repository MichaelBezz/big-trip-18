/** @typedef {[label: string, value: string]} FilterOptionState */

import ComponentView, {html} from './component-view.js';

/** Представление фильтра */
export default class FilterOptionView extends ComponentView {
  /**
   * @param  {FilterOptionState} state
   */
  constructor(...state) {
    super(...state);

    this.classList.add('trip-filters__filter');
  }

  /**
   * @override
   * @param {FilterOptionState} state
   */
  createAdjacentHtml(...state) {
    const [label, value] = state;

    return html`
      <input
        id="filter-${value}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${value}"
      >
      <label class="trip-filters__filter-label" for="filter-${value}">
        ${label}
      </label>
    `;
  }
}

customElements.define(String(FilterOptionView), FilterOptionView);
