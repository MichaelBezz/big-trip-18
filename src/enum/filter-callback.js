/** @typedef {import('../adapter/point-adapter').default} PointAdapter */

import Enum from './enum.js';

export default class FilterCallback extends Enum {
  static EVERYTHING = () => true;

  /**
   * @param {PointAdapter} point
   */
  static FUTURE = (point) =>
    Date.parse(point.endDate) > Date.now();
}
