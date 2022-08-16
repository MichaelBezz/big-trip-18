import BaseView from './base-view.js';

/** Маршрут путешествия */
export default class RouteView extends BaseView {
  constructor() {
    super();

    this.classList.add('trip-events__list');
  }

  append(...views) {
    views.forEach((view) => {
      view.classList.add('trip-events__item');
    });

    super.append(...views);

    return this;
  }
}

customElements.define('trip-route', RouteView);
