export default class Model extends EventTarget {
  /**
   * @override
   * @param {string | string[]} type
   * @param {EventListener | EventListenerObject} listener
   * @param {boolean | EventListenerOptions} options
   */
  addEventListener(type, listener, options = false) {
    [].concat(type).forEach((name) => {
      super.addEventListener(name, listener, options);
    });
  }

  /**
   * Вернет `Promise`, который выполнится когда модель завершит основные
   * асинхронные операции
   *
   * Реализация этого метода обязательна для всех моделей
   */
  async ready() {}
}
