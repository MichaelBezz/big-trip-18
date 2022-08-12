import BaseView from './base-view.js';
import createPointCreatorTemplate from './trip-point-creator-template.js';

/** Форма создания нового события на маршруте путешествия */
export default class TripPointCreatorView extends BaseView {
  /** @override */
  createAdjacentHtml() {
    return createPointCreatorTemplate(...arguments);
  }
}

customElements.define('trip-point-creator', TripPointCreatorView);
