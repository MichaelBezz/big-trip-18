import BaseView from './base-view.js';
import createMessageTemplate from './trip-message-template.js';

/** Служебное сообщение */
export default class TripMessageView extends BaseView {
  /** @override */
  createAdjacentHtml() {
    return createMessageTemplate(...arguments);
  }
}

customElements.define('trip-message', TripMessageView);
