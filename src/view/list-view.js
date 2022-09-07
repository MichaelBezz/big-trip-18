import ComponentView from './component-view.js';

export * from './component-view.js';

/** Базовое представление List */
export default class ListView extends ComponentView {
  constructor() {
    super();

    this.classList.add('trip-events__list');
  }
}
