/** Базовое представление */
export default class BaseView extends HTMLElement {
  constructor(...args) {
    super();
    this.insertAdjacentHTML(this.adjacentHtmlPosition, this.createAdjacentHtml(...args));
  }

  /** Задаёт позицию дополнительной html-разметки */
  get adjacentHtmlPosition() {
    return 'beforeend';
  }

  /** Создаст дополнительную html-разметку */
  createAdjacentHtml() {
    return '';
  }
}
