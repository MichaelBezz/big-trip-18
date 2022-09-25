import Model from './model.js';

/**
 * Модель коллекции
 * @template Item
 * @template {Adapter} ItemAdapter
 */
export default class CollectionModel extends Model {
  #store;
  #adapt;

  /** @type {Item[]} */
  #items;

  /** @type {Promise<void>} */
  #ready;

  /**
   * @param {Store<Item>} store
   * @param {(item?: Item) => ItemAdapter} adapt
   */
  constructor(store, adapt) {
    super();

    this.#store = store;
    this.#adapt = adapt;
  }

  get blank() {
    return this.#adapt();
  }

  /**
   * Вернет `Promise`, который выполнится после получения данных
   * из хранилища
   *
   * Вызов этого метода обязателен перед началом работы с коллекцией
   * @override
   */
  ready() {
    this.#ready ??= this.#store.list().then((items) => {
      this.#items = items;
    });

    return this.#ready;
  }

  /**
   * Вернет все элементы коллекции
   */
  listAll() {
    return this.#items.map(this.#adapt);
  }

  /**
   * Найдет элемент по индексу
   * @param {number} index
   */
  item(index) {
    const item = this.#items[index];

    return item && this.#adapt(item);
  }

  /**
   * Найдет элемент по свойству `key` и значению `value`
   * @param {string} key
   * @param {*} value
   */
  findBy(key, value) {
    return this.listAll().find((item) => item[key] === value);
  }

  /**
   * Найдет элемент по идентификатору
   * @param {string} value
   */
  findById(value) {
    return this.findBy('id', value);
  }

  /**
   * Найдет индекс элемента по свойству `key` и значению `value`
   * @param {string} key
   * @param {*} value
   */
  findIndexBy(key, value) {
    return this.listAll().findIndex((item) => item[key] === value);
  }

  /**
   * Найдет индекс элемента по идентификатору
   * @param {string} value
   */
  findIndexById(value) {
    return this.findIndexBy('id', value);
  }

  /**
   * Добавит элемент в коллекцию
   * @param {ItemAdapter} item
   */
  async add(item) {
    const newItem = await this.#store.add(item.toJSON());
    const detail = this.#adapt(newItem);

    this.#items.push(newItem);

    this.dispatchEvent(new CustomEvent('add', {detail}));
  }

  /**
   * Обновит свойства элемента
   * @param {string} id
   * @param {ItemAdapter} item
   */
  async update(id, item) {
    const updatedItem = await this.#store.update(id, item.toJSON());
    const index = this.findIndexById(id);
    const detail = [this.#adapt(updatedItem), this.item(index)];

    this.#items.splice(index, 1, updatedItem);

    this.dispatchEvent(new CustomEvent('update', {detail}));
  }

  /**
   * Удалит элемент из коллекции
   * @param {string} id
   */
  async remove(id) {
    await this.#store.remove(id);

    const index = this.findIndexById(id);
    const [detail] = this.#items.splice(index, 1);

    this.dispatchEvent(new CustomEvent('remove', {detail}));
  }
}
