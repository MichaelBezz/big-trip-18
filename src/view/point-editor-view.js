import BaseView from './base-view.js';
import createPointEditorTemplate from './point-editor-template.js';

/** Форма редактирования точки на маршруте */
export default class PointEditorView extends BaseView {
  /** @override */
  createAdjacentHtml() {
    return createPointEditorTemplate(...arguments);
  }
}

customElements.define('point-editor', PointEditorView);
