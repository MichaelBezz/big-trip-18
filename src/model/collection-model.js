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

  /**
   * @param {Store<Item>} store
   * @param {(item: Item) => ItemAdapter} adapt
   */
  constructor(store, adapt) {
    super();

    this.#store = store;
    this.#adapt = adapt;
  }

  /**
   * Запишет Item по готовности
   * @override
   */
  async ready() {
    if (!this.#items) {
      this.#items = await this.#store.list();
    }
  }

  /** Вернет список ItemAdapter */
  listAll() {
    return this.#items.map(this.#adapt);
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
   * @param {ItemId} value
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
   * @param {ItemId} value
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

    this.#items.push(newItem);

    this.dispatchEvent(new CustomEvent('add'));
  }

  /**
   * Обновит ItemAdapter в списке
   * @param {ItemId} id
   * @param {ItemAdapter} item
   */
  async update(id, item) {
    const updatedItem = await this.#store.update(id, item.toJSON());

    const index = this.findIndexById(id);
    this.#items.splice(index, 1, updatedItem);

    this.dispatchEvent(new CustomEvent('update'));
  }

  /**
   * Удалит ItemAdapter из списка
   * @param {ItemId} id
   */
  async remove(id) {
    await this.#store.remove(id);

    const index = this.findIndexById(id);
    this.#items.splice(index, 1);

    this.dispatchEvent(new CustomEvent('remove'));
  }
}
