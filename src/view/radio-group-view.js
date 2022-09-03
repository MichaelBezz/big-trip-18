import ComponentView from './component-view.js';

export * from './component-view.js';

export default class RadioGroupView extends ComponentView {
  get inputSelector() {
    return '[type="radio"]';
  }

  /** Получит значение у input */
  getValue() {
    /** @type {HTMLInputElement} */
    const checkedView = this.querySelector(`${this.inputSelector}:checked`);

    if (checkedView) {
      return checkedView.value;
    }

    return '';
  }

  /**
   * Установит input свойство checked
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
   * Установит input свойство disabled
   * @param {boolean[]} flags
   */
  setOptionsDisabled(flags) {
    /** @type {NodeListOf<HTMLInputElement>} */
    const views = this.querySelectorAll(this.inputSelector);

    views.forEach((view, index) => {
      view.disabled = flags[index];
    });

    return this;
  }
}
