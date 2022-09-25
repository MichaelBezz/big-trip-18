import View from './view.js';

export * from './view.js';

export default class RadioGroupView extends View {
  get inputSelector() {
    return '[type="radio"]';
  }

  /**
   * @type {NodeListOf<HTMLInputElement>}
   */
  get inputViews() {
    return this.querySelectorAll(this.inputSelector);
  }

  /**
   * Вернет значение выбранной радиокнопки
   */
  getValue() {
    /** @type {HTMLInputElement} */
    const checkedView = this.querySelector(`${this.inputSelector}:checked`);

    if (checkedView) {
      return checkedView.value;
    }

    return '';
  }

  /**
   * Выберет радиокнопку по значению
   * @param {string} value
   */
  setValue(value) {
    /** @type {HTMLInputElement} */
    const view = this.querySelector(`${this.inputSelector}[value="${value}"]`);

    if (view) {
      view.checked = true;
    }

    return this;
  }

  /**
   * Вернет индекс выбранной радиокнопки
   */
  getIndex() {
    return [...this.inputViews].findIndex((view) => view.checked);
  }

  /**
   * Выберет радиокнопку по индексу
   * @param {number} index
   */
  setIndex(index, notify = true) {
    const views = this.inputViews;
    const rangeIndex = (views.length + index) % views.length;

    views[rangeIndex].checked = true;

    if (notify) {
      views[rangeIndex].dispatchEvent(new Event('change', {bubbles: true}));
    }

    return this;
  }

  /**
   * Переключит состояние disabled у радиокнопок
   * @param {boolean[]} flags
   */
  setOptionsDisabled(flags) {
    this.inputViews.forEach((view, index) => {
      view.disabled = flags[index];
    });

    return this;
  }
}
