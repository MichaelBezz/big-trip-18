export default class Enum {
  /**
   * Найдет ключ по значению
   * @param {*} value
   */
  static findKey(value) {
    return Object.keys(this).find((key) => this[key] === value);
  }
}
