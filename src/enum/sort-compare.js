import Enum from './enum.js';

export default class SortCompare extends Enum {
  /**
   * @param {PointAdapter} pointA
   * @param {PointAdapter} pointB
   */
  static DAY = (pointA, pointB) => Date.parse(pointA.startDate) - Date.parse(pointB.startDate);
  static EVENT = () => 0;
  static TIME = () => 0;

  /**
   * @param {PointAdapter} pointA
   * @param {PointAdapter} pointB
   */
  static PRICE = (pointA, pointB) => pointB.basePrice - pointA.basePrice;
  static OFFERS = () => 0;
}
