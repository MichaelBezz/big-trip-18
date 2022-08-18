import {generatePoints} from '../mock/point-mock.js';
import {generateDestinations} from '../mock/destination-mock.js';
import {generateOfferGroups} from '../mock/offer-mock.js';

const points = generatePoints();
const destinations = generateDestinations();
const offerGroups = generateOfferGroups();

/** Получает данные для маршрута */
export default class RouteModel {
  /**
   * Возвращает точки маршрута
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
