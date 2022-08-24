import ComponentView from './component-view.js';

/** Представление маршрута путешествия */
export default class RouteView extends ComponentView {
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

customElements.define('route-map', RouteView);
