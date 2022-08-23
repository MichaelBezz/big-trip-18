/** Базовое представление */
export default class BaseView extends HTMLElement {
  constructor() {
    super();

    this.insertAdjacentHTML(this.position, this.createTemplate());
  }

  /**
   * Задаст позицию дополнительной html-разметки
   * @type {InsertPosition}
   */
  get position() {
    return 'beforeend';
  }

  /** Создаст дополнительную html-разметку */
  createTemplate() {
    return '';
  }
}
