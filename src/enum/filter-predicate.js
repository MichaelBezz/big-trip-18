/** @typedef {(item: PointAdapter) => boolean} PointPredicate */

import Enum from './enum.js';

export default class FilterPredicate extends Enum {
  /** @type {PointPredicate} */
  static EVERYTHING = () => true;

  /**
   * @type {PointPredicate}
   * @param {PointAdapter} point
   */
  static FUTURE = (point) => Date.parse(point.endDate) > Date.now();
}
