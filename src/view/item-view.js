import View from './view.js';
import './item-view.css';

export * from './view.js';

/** Базовое представление Item */
export default class ItemView extends View {
  /**
   * @param  {PointState[]} states
   */
  constructor(...states) {
    super(...states);

    this.classList.add('trip-events__item');
  }
}
