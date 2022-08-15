import BaseView from './base-view.js';
import createPointCreatorTemplate from './point-creator-template.js';

/** Форма создания новой точки на маршруте */
export default class PointCreatorView extends BaseView {
  /** @override */
  createAdjacentHtml() {
    return createPointCreatorTemplate();
  }
}

customElements.define('point-creator', PointCreatorView);
