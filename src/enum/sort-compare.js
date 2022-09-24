import Enum from './enum.js';

export default class SortCompare extends Enum {

  /** @type {Compare<PointAdapter>} */
  static DAY = (point, nextPoint) => Date.parse(point.startDate) - Date.parse(nextPoint.startDate);

  /** @type {Compare<PointAdapter>} */
  static EVENT = () => 0;

  /** @type {Compare<PointAdapter>} */
  static TIME = () => 0;

  /** @type {Compare<PointAdapter>} */
  static PRICE = (point, nextPoint) => nextPoint.basePrice - point.basePrice;

  /** @type {Compare<PointAdapter>} */
  static OFFERS = () => 0;
}
