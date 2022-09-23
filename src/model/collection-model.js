import Model from './model.js';

/**
 * Абстрактная модель коллекции Item
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
   * Запишет Item по готовности
   * @override
   */
  ready() {
    this.#ready ??= this.#store.list().then((items) => {
      this.#items = items;
    });

    return this.#ready;
  }

  /** Вернет список ItemAdapter */
  listAll() {
    return this.#items.map(this.#adapt);
  }

  /**
   * Вернет ItemAdapter по индексу
   * @param {number} index
   */
  item(index) {
    const item = this.#items[index];

    return item && this.#adapt(item);
  }

  /**
   * Найдет ItemAdapter по свойству key со значением value
   * @param {string} key
   * @param {*} value
   */
  findBy(key, value) {
    return this.listAll().find((item) => item[key] === value);
  }

  /**
   * Найдет ItemAdapter по свойству id
   * @param {string} value
   */
  findById(value) {
    return this.findBy('id', value);
  }

  /**
   * Найдет индекс ItemAdapter по свойству key со значением value
   * @param {string} key
   * @param {*} value
   */
  findIndexBy(key, value) {
    return this.listAll().findIndex((item) => item[key] === value);
  }

  /**
   * Найдет индекс ItemAdapter по свойству id
   * @param {string} value
   */
  findIndexById(value) {
    return this.findIndexBy('id', value);
  }

  /**
   * Добавит ItemAdapter в список
   * NOTE item.toJSON() из-за преобразования в adapter
   * @param {ItemAdapter} item
   */
  async add(item) {
    const newItem = await this.#store.add(item.toJSON());
    const detail = this.#adapt(newItem);

    this.#items.push(newItem);

    this.dispatchEvent(new CustomEvent('add', {detail}));
  }

  /**
   * Обновит ItemAdapter в списке
   * @param {string} id
   * @param {ItemAdapter} item
   */
  async update(id, item) {
    const updatedItem = await this.#store.update(id, item.toJSON());
    const index = this.findIndexById(id);
    const detail = [this.item(index), this.#adapt(updatedItem)];

    this.#items.splice(index, 1, updatedItem);

    this.dispatchEvent(new CustomEvent('update', {detail}));
  }

  /**
   * Удалит ItemAdapter из списка
   * @param {string} id
   */
  async remove(id) {
    await this.#store.remove(id);

    const index = this.findIndexById(id);
    const [detail] = this.#items.splice(index, 1);

    this.dispatchEvent(new CustomEvent('remove', {detail}));
  }
}
