import {generatePoints} from '../mock/point-mock.js';
import {generateDestinations} from '../mock/destination-mock.js';
import {generateOfferGroups} from '../mock/offer-mock.js';
import PointAdapter from '../adapter/point-adapter.js';

/**
 * @template T
 * @param {T} target
 * @returns {T}
 */
const clone = (target) =>
  JSON.parse(JSON.stringify(target));

const points = generatePoints();
const destinations = generateDestinations();
const offerGroups = generateOfferGroups();

/** Модель маршрута */
export default class RouteModel {
  /** @type {Point[]} */
  #pointCache = generatePoints();

  /** @type {Destination[]} */
  #destinationCache = generateDestinations();

  /** @type {OfferGroup[]} */
  #offerCache = generateOfferGroups();

  /** Получит список точек с отформатированными полями */
  getPoints() {
    return this.#pointCache.map((point) => new PointAdapter(point));
  }

  /**
   * Получит точку маршрута по id с отформатированными полями
   * @param {string} id
   */
  getPointById(id) {
    const point = this.#pointCache.find((item) => item.id === id);

    return new PointAdapter(point);
  }

  /**
   * Получит доступные опции для определенного типа точки
   * @param {PointType} type
   */
  getAvailableOffers(type) {
    return this.#offerCache.find((group) => group.type === type).offers;
  }

  /**
   * Получит опции для точки
   * @param {PointType} type
   * @param {number[]} ids
   */
  getOffers(type, ids) {
    return this.getAvailableOffers(type).filter((item) => ids.includes(item.id));
  }

  /** Получит список пунктов назначения */
  getDestination() {
    return clone(this.#destinationCache);
  }

  /**
   * Получит пункт назначения по id
   * @param {number} id
   */
  getDestinationById(id) {
    const destination = this.#destinationCache.find((item) => item.id === id);

    return clone(destination);
  }


  /**
   * Получит точки маршрута
   * @return {AggregatedPoint[]}
   */
  get() {
    return points.map((point) => ({
      ...point,
      destination: destinations.find((destination) => destination.id === point.destination),
      offers: offerGroups.find((group) => group.type === point.type).offers
    }));
  }
}
