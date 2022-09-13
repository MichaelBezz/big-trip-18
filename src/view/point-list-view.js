import View from './view.js';
import PointView from './point-view.js';

/** Представление списка точек */
export default class PointListView extends View {
  constructor() {
    super();

    this.classList.add('trip-events__list');
  }

  /**
   * @param {PointState[]} states
   */
  setPoints(states) {
    const views = states.map((state) => new PointView(state));

    this.replaceChildren(...views);

    return this;
  }
}

customElements.define(String(PointListView), PointListView);
