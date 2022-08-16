import {generateOfferGroup, generateDestination, generatePoint} from '../mock/route-mock.js';

/** Получает данные для маршрута */
export default class RouteModel {
  /**
   * Возвращает точки маршрута
   * @return {AggregatedPoint[]}
   */
  get() {
    const points = Array.from({length: 3}, generatePoint);
    const destinations = Array.from({length: 3}, generateDestination);
    const offerGroups = Array.from({length: 1}, generateOfferGroup);

    return points.map((point) => ({
      ...point,
      destination: destinations.find((destination) => destination.id === point.destination),
      offers: offerGroups.find((group) => group.type === point.type).offers
    }));
  }
}
