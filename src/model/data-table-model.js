import CollectionModel from './collection-model';

/**
 * Абстрактная model для фильтрации и сортировки
 * @template Item
 * @template {Adapter} ItemAdapter
 * @extends {CollectionModel<Item,ItemAdapter>}
 */
export default class DataTableModel extends CollectionModel {

  /** @type {Predicate<ItemAdapter>} */
  #filter = () => true;

  /** @type {Compare<ItemAdapter>} */
  #sort = () => 0;

  /** Получит callback фильтра */
  getFilter() {
    return this.#filter;
  }

  /**
   * Установит фильтр
   * @param {Predicate<ItemAdapter>} predicate
   */
  setFilter(predicate, notify = true) {
    this.#filter = predicate;

    if (notify) {
      this.dispatchEvent(new CustomEvent('filter'));
    }

    return this;
  }

  /** Получит callback сортировки */
  getSort() {
    return this.#sort;
  }

  /**
   * Установит сортировку
   * @param {Compare<ItemAdapter>} compare
   */
  setSort(compare, notify = true) {
    this.#sort = compare;

    if (notify) {
      this.dispatchEvent(new CustomEvent('sort'));
    }

    return this;
  }

  list(predicate = this.getFilter(), compare = this.getSort()) {
    return this.listAll().filter(predicate).sort(compare);
  }
}
