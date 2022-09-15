import Enum from './enum.js';

export default class UnitFormat extends Enum {
  static TIME = 'HH:mm';
  static DATE = 'MMM D';
  static DATE_WITH_TIME = 'd/m/y H:i';
}