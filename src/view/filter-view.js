import RadioGroupView, {html} from './radio-group-view.js';

export default class FilterView extends RadioGroupView {
  constructor() {
    super();

    this.classList.add('trip-controls__filters');
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        <!-- Options -->
        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    `;
  }

  /**
   * @param  {FilterOptionState} state
   */
  createOptionHtml(...state) {
    const [label, value] = state;

    return html`
      <div class="trip-filters__filter">
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
      </div>
    `;
  }

  /**
   * @param {FilterOptionState[]} states
   */
  setOptions(states) {
    this.querySelector('.trip-filters').insertAdjacentHTML('afterbegin', html`${
      states.map((state) => this.createOptionHtml(...state))
    }`);

    return this;
  }
}

customElements.define(String(FilterView), FilterView);
