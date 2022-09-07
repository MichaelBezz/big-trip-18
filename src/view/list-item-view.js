import ComponentView from './component-view.js';
import './list-item-view.css';

export * from './component-view.js';

/** Базовое представление Item */
export default class ListItemView extends ComponentView {
  /**
   * @param  {PointState[]} states
   */
  constructor(...states) {
    super(...states);

    this.classList.add('trip-events__item');
  }
}
