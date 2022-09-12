import View from './view.js';

export * from './view.js';

/** Базовое представление List */
export default class ListView extends View {
  constructor() {
    super();

    this.classList.add('trip-events__list');
  }
}
