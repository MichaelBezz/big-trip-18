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
export default class RouteModel {
  /** @type {Point[]} */
  #points = generatePoints();

  /** @type {Destination[]} */
  #destinations = generateDestinations();

  /** @type {OfferGroup[]} */
  #offerGroups = generateOfferGroups();

  /** Получит список точек с отформатированными полями */
  getPoints() {
    return this.#points.map((point) => new PointAdapter(point));
  }

  /**
   * Получит точку маршрута по id с отформатированными полями
   * @param {string} id
   */
  getPointById(id) {
    const point = new PointAdapter(this.#points.find((item) => item.id === id));

    return clone(point);
  }

  /**
   * Получит доступные опции для определенного типа точки
   * @param {PointType} type
   */
  getAvailableOffers(type) {
    const availableOffers = this.#offerGroups.find((group) => group.type === type).offers;

    return clone(availableOffers);
  }

  /**
   * Получит опции для точки
   * @param {PointType} type
   * @param {number[]} ids
   */
  getSelectedOffers(type, ids) {
    const selectedOffers = this.getAvailableOffers(type).filter((item) => ids.includes(item.id));

    return clone(selectedOffers);
  }

  /** Получит список пунктов назначения */
  getDestinations() {
    return clone(this.#destinations);
  }

  /**
   * Получит пункт назначения по id
   * @param {number} id
   */
  getDestinationById(id) {
    const destination = this.#destinations.find((item) => item.id === id);

    return clone(destination);
  }
}
