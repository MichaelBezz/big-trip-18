import Enum from './enum.js';

/** @typedef {(item: PointAdapter) => boolean} PointPredicate */

export default class FilterPredicate extends Enum {
  /** @type {PointPredicate} */
  static EVERYTHING = () => true;

  /**
   * @type {PointPredicate}
   * @param {PointAdapter} point
   */
  static FUTURE = (point) => Date.parse(point.endDate) > Date.now();
}
