import BaseView from './base-view.js';
import createPointEditorTemplate from './point-editor-template.js';

/** Представление формы редактирования точки */
export default class PointEditorView extends BaseView {
  #linkedView = null;

  constructor() {
    super();

    this.querySelector('.event__rollup-btn').addEventListener('click', () => {
      this.close();
    });
  }

  /** @override */
  createAdjacentHtml() {
    return createPointEditorTemplate(...arguments);
  }

  /**
   * Свяжет редактор с другим представлением
   * @param {HTMLElement} view
   */
  link(view) {
    this.#linkedView = view;

    return this;
  }

  /**
   * @returns Откроет редактор точки
   */
  open() {
    this.#linkedView.replaceWith(this);

    document.addEventListener('keydown', this);

    return this;
  }

  /**
   * Закроет редактор точки
   */
  close() {
    this.replaceWith(this.#linkedView);

    document.removeEventListener('keydown', this);

    return this;
  }

  /**
   * Установит иконку
   * @param {OfferType} type
   */
  setIcon(type) {
    const iconPoint = this.querySelector('.event__type-icon');

    Object.assign(iconPoint, {src: `img/icons/${type}.png`});

    return this;
  }

  /**
   * Обработает событие по нажатию на клавишу Esc
   * @param {KeyboardEvent} event
   */
  handleEvent(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }
}

customElements.define('point-editor', PointEditorView);
