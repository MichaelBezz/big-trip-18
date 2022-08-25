export default class ComponentView extends HTMLElement {
  constructor() {
    super();

    this.insertAdjacentHTML(
      this.adjacentHtmlPosition,
      this.createAdjacentHtml(...arguments)
    );
  }

  /**
   * Задаст позицию дополнительной html-разметки
   * @type {InsertPosition}
   */
  get adjacentHtmlPosition() {
    return 'beforeend';
  }

  /**
   * Создаст дополнительную html-разметку
   * @param {...*} data
   */
  createAdjacentHtml(...data) {
    return data.join('');
  }

  /** Получит префикс тега */
  static get tagNamePrefix() {
    return 'trip';
  }

  /** Получит имя тега */
  static get tagName() {
    const hyphenCaseName = this.name.replace(/[A-Z]/g, '-$&').toLowerCase();

    return this.tagNamePrefix + hyphenCaseName.replace(/-view$/, '');
  }

  /** Вернет имя тега */
  static toString() {
    return this.tagName;
  }
}

/**
 * Теговый шаблон html
 * @param {TemplateStringsArray} strings
 * @param {...*} values
 * @return {string}
 */
export const html = (strings, ...values) => values.reduce((result, value, index) => {
  if (typeof value === 'function') {
    value = `<${value}></${value}>`;
  }

  return result + value + strings[index + 1];
}, strings[0]);

