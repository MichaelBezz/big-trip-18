import Enum from './enum.js';

export default class Mode extends Enum {
  static CREATOR = 1;
  static EDITOR = 2;
  static VIEWER = 3;
}
