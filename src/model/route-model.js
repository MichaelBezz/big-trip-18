import {generatePoint} from '../mock/point-mock.js';
import {generateDestination} from '../mock/destination-mock.js';
import {generateOfferGroup} from '../mock/offer-mock.js';

/** Получает данные для маршрута */
export default class RouteModel {
  /**
   * Возвращает точки маршрута
   * @return {AggregatedPoint[]}
   */
  get() {
    const points = Array.from({length: 5}, generatePoint);
    const destinations = Array.from({length: 5}, generateDestination);
    const offerGroups = Array.from({length: 1}, generateOfferGroup);

    console.log(...points);
    console.log(...destinations);
    console.log(...offerGroups);

    return points.map((point) => ({
      ...point,
      // destination: destinations.find((destination) => destination.id === point.destination),
      // offers: offerGroups.find((group) => group.type === point.type).offers
    }));
  }
}
