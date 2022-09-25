import CollectionModel from './collection-model';

/**
 * Модель таблицы данных
 * @template Item
 * @template {Adapter} ItemAdapter
 * @extends {CollectionModel<Item,ItemAdapter>}
 */
export default class DataTableModel extends CollectionModel {

  /** @type {Predicate<ItemAdapter>} */
  #filter;

  /** @type {Compare<ItemAdapter>} */
  #sort;

  /**
   * Установит функцию фильтрации
   * @param {Predicate<ItemAdapter>} predicate
   */
  setFilter(predicate, notify = true) {
    this.#filter = predicate;

    if (notify) {
      this.dispatchEvent(new CustomEvent('filter'));
    }

    return this;
  }

  getFilter() {
    return this.#filter;
  }

  /**
   * Установит функцию сортировки
   * @param {Compare<ItemAdapter>} compare
   */
  setSort(compare, notify = true) {
    this.#sort = compare;

    if (notify) {
      this.dispatchEvent(new CustomEvent('sort'));
    }

    return this;
  }

  getSort() {
    return this.#sort;
  }

  /**
   * Вернет отфильтрованные и отсортированные элементы
   */
  list(predicate = this.getFilter(), compare = this.getSort()) {
    return this.listAll().filter(predicate).sort(compare);
  }
}
