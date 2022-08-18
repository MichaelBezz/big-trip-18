import BaseView from './base-view.js';
import createPointCreatorTemplate from './point-creator-template.js';

/** Представление формы создания новой точки */
export default class PointCreatorView extends BaseView {
  /** @override */
  createAdjacentHtml() {
    return createPointCreatorTemplate(...arguments);
  }
}

customElements.define('point-creator', PointCreatorView);
