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
    return createPointEditorTemplate();
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
   * @returns Откроет редактор точки (заменив на #linkedView)
   */
  open() {
    this.#linkedView.replaceWith(this);

    document.addEventListener('keydown', this);

    return this;
  }

  /**
   * Закроет редактор точки (заменив на #linkedView)
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
    const iconView = this.querySelector('.event__type-icon');

    Object.assign(iconView, {src: `img/icons/${type}.png`});

    return this;
  }

  /**
   * Установит тип
   * @param {OfferType} type
   */
  setType(type) {
    const typeView = this.querySelector('.event__type-output');

    Object.assign(typeView, {textContent: type});

    return this;
  }

  /**
   * Установит пункт назначения
   * @param {string} destination
   */
  setDestination(destination) {
    const destinationView = this.querySelector('.event__input--destination');

    Object.assign(destinationView, {value: destination});

    return this;
  }

  /**
   * Установит время начала
   * @param {string} isoDate
   */
  setStartTime(isoDate) {
    const startTimeView = this.querySelector('[name="event-start-time"]');

    Object.assign(startTimeView, {value: isoDate});

    return this;
  }

  /**
   * Установит время окончания
   * @param {string} isoDate
   */
  setEndTime(isoDate) {
    const endTimeView = this.querySelector('[name="event-end-time"]');

    Object.assign(endTimeView, {value: isoDate});

    return this;
  }

  /**
   * Установит цену
   * @param {number} price
   */
  setPrice(price) {
    const priceView = this.querySelector('.event__input--price');

    Object.assign(priceView, {value: price});

    return this;
  }

  /**
   * Установит описание
   * @param {string} description
   */
  setDescription(description) {
    const descriptionView = this.querySelector('.event__destination-description');

    Object.assign(descriptionView, {textContent: description});

    return this;
  }

  /**
   * Заменит дополнительные опции
   * @param {...HTMLElement} offerViews
   */
  replaceOffers(...offerViews) {
    const availableOffersView = this.querySelector('.event__available-offers');

    availableOffersView.replaceChildren(...offerViews);

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
