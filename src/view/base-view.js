/** Базовое представление */
export default class BaseView extends HTMLElement {
  constructor() {
    super();
    this.insertAdjacentHTML(this.adjacentHtmlPosition, this.createAdjacentHtml(...arguments));
  }

  /** Задаёт позицию дополнительной html-разметки */
  get adjacentHtmlPosition() {
    return 'beforeend';
  }

  /** Создаст дополнительную html-разметку */
  createAdjacentHtml() {
    return '';
  }

  /**
   * @param {string} selector
   * @param {string | Object} properties
   */
  set(selector, properties) {
    const view = this.querySelector(selector);

    if (typeof properties === 'string') {
      properties = {textContent: properties};
    }
    Object.assign(view, properties);

    return this;
  }
}
