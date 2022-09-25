import './view.css';

/**
 * Тег шаблонных html-строк
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

/**
 * Базовое представление
 */
export default class View extends HTMLElement {
  constructor() {
    super();

    this.insertAdjacentHTML(
      this.adjacentHtmlPosition,
      this.createAdjacentHtml(...arguments)
    );
  }

  /**
   * Позиция дополнительной html-разметки
   * @type {InsertPosition}
   */
  get adjacentHtmlPosition() {
    return 'beforeend';
  }

  /**
   * Создаст дополнительную html-разметку (аргументы передает конструктор)
   */
  createAdjacentHtml() {
    return html`${[...arguments]}`;
  }

  /**
   * Переключит видимость представления
   * @param {boolean} flag
   */
  display(flag) {
    this.hidden = !flag;

    return this;
  }

  /**
   * Применит эффект покачивания
   */
  shake() {
    this.classList.add('shake');

    this.addEventListener('animationend', () => {
      this.classList.remove('shake');
    }, {
      once: true
    });
  }

  static get isViewConstructor() {
    return true;
  }

  /**
   * Префикс html-тега
   */
  static get tagNamePrefix() {
    return 'trip';
  }

  /**
   * Имя html-тега (формируется из имени конструктора)
   *
   * @example
   * PointView.tagName // 'trip-point'
   * DatePickerView.tagName // 'trip-date-picker'
   */
  static get tagName() {
    const hyphenCaseName = this.name.replace(/[A-Z]/g, '-$&').toLowerCase();

    return this.tagNamePrefix + hyphenCaseName.replace(/-view$/, '');
  }

  static toString() {
    return this.tagName;
  }
}
