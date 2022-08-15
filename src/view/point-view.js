import BaseView from './base-view.js';
import createPointTemplate from './point-template.js';

/** Точка на маршруте */
export default class PointView extends BaseView {
  /** @override */
  createAdjacentHtml() {
    return createPointTemplate();
  }
}

customElements.define('trip-point', PointView);
