import BaseView from './base-view.js';
import createPointEditorTemplate from './trip-point-editor-template.js';

/** Форма редактирования события на маршруте путешествия */
export default class TripPointEditorView extends BaseView {
  /** @override */
  createAdjacentHtml() {
    return createPointEditorTemplate(...arguments);
  }
}

customElements.define('trip-point-editor', TripPointEditorView);
