/**
 * Теговый шаблон html
 * @param {TemplateStringsArray} strings
 * @param {...*} values
 * @return {string}
 */
export const html = (strings, ...values) =>
  values.reduce((result, value, index) => {

    if (value?.isViewConstructor) {
      value = `<${value}></${value}>`;
    }

    if (Array.isArray(value)) {
      value = value.join('');
    }

    return result + value + strings[index + 1];

  }, strings[0]);

/** Базовое представление View */
export default class View extends HTMLElement {
  /**
   * @param  {...*} data
   */
  constructor(...data) {
    super();

    this.insertAdjacentHTML(
      this.position,
      this.createAdjacentHtml(...data)
    );
  }

  /**
   * Задаст позицию дополнительной html-разметки
   * @type {InsertPosition}
   */
  get position() {
    return 'beforeend';
  }

  /** Создаст дополнительную html-разметку */
  createAdjacentHtml() {
    return html`${[...arguments]}`;
  }

  /**
   * Установит свойства
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    this[key] = value;

    return this;
  }

  static get isViewConstructor() {
    return true;
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