import View from './view.js';
import './list-item-view.css';

export * from './view.js';

/** Базовое представление Item */
export default class ListItemView extends View {
  /**
   * @param  {PointState[]} states
   */
  constructor(...states) {
    super(...states);

    this.classList.add('trip-events__item');
  }
}
