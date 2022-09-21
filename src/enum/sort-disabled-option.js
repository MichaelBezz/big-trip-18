import Enum from './enum.js';

export default class SortDisabledOption extends Enum {
  static DAY = false;
  static EVENT = true;
  static TIME = true;
  static PRICE = false;
  static OFFERS = true;
}
