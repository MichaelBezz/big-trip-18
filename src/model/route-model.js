import {generatePoints} from '../mock/point-mock.js';
import {generateDestinations} from '../mock/destination-mock.js';
import {generateOfferGroups} from '../mock/offer-mock.js';

import PointAdapter from '../adapter/point-adapter.js';

/**
 * Глубокое клонирование объекта target
 * @template T
 * @param {T} target
 * @return {T}
 */
const clone = (target) =>
  JSON.parse(JSON.stringify(target));

/** Модель маршрута */
export default class RouteModel extends EventTarget {
  #points = null;
  #destinations = null;
  #offerGroups = null;

  async ready() {
    if (this.#points) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    /** @type {Point[]} */
    this.#points = generatePoints();

    /** @type {Destination[]} */
    this.#destinations = generateDestinations();

    /** @type {OfferGroup[]} */
    this.#offerGroups = generateOfferGroups();
  }

  /**
   * Получит список точек с отформатированными полями
   * @return {PointAdapter[]}
   */
  getPoints() {
    return this.#points.map((point) => new PointAdapter(clone(point)));
  }

  /**
   * Получит точку маршрута по id с отформатированными полями
   * @param {number} id
   * @return {PointAdapter}
   */
  getPointById(id) {
    return this.getPoints().find((item) => item.id === id);
  }

  /**
   * Получит доступные опции для определенного типа точки
   * @param {string} type
   * @return {Offer[]}
   */
  getAvailableOffers(type) {
    const availableOffers = this.#offerGroups.find((group) => group.type === type).offers;

    return clone(availableOffers);
  }

  /**
   * Получит опции для точки
   * @param {string} type
   * @param {number[]} ids
   * @return {Offer[]}
   */
  getSelectedOffers(type, ids) {
    const selectedOffers = this.getAvailableOffers(type).filter((item) => ids.includes(item.id));

    return clone(selectedOffers);
  }

  /**
   * Получит список пунктов назначения
   * @return {Destination[]}
   */
  getDestinations() {
    return clone(this.#destinations);
  }

  /**
   * Получит пункт назначения по id
   * @param {number} id
   * @return {Destination}
   */
  getDestinationById(id) {
    const destination = this.#destinations.find((item) => item.id === id);

    return clone(destination);
  }

  // /**
  //  * Обновит точки
  //  * @param {number} id
  //  * @param {*} data
  //  */
  // async updatePoints(id, data) {
  //   /*
  //     1. Отправить данные в хранилище
  //     2. Сообщить, что точка обновлена
  //   */

  //   this.dispatchEvent(new CustomEvent('update-point', {detail: id}));
  // }
}
