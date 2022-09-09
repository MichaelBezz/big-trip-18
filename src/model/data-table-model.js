import CollectionModel from './collection-model';

/**
 * Абстрактная model для фильтрации и сортировки
 * @template Item
 * @template {Adapter} ItemAdapter
 * @extends {CollectionModel<Item,ItemAdapter>}
 */
export default class DataTableModel extends CollectionModel {

  /** @typedef {(item: ItemAdapter) => boolean} FilterPredicate */
  /** @typedef {(item: ItemAdapter, nextItem: ItemAdapter) => number} SortCompare */

  /** @type {FilterPredicate} */
  #filter = () => true;

  /** @type {SortCompare} */
  #sort = () => 0;

  /** Получит callback фильтра */
  getFilter() {
    return this.#filter;
  }

  /**
   * Установит фильтр
   * @param {FilterPredicate} predicate
   */
  setFilter(predicate) {
    this.#filter = predicate;

    this.dispatchEvent(new CustomEvent('filter'));

    return this;
  }

  /** Получит callback сортировки */
  getSort() {
    return this.#sort;
  }

  /**
   * Установит сортировку
   * @param {SortCompare} compare
   */
  setSort(compare) {
    this.#sort = compare;

    this.dispatchEvent(new CustomEvent('sort'));

    return this;
  }

  list(predicate = this.getFilter(), compare = this.getSort()) {
    return this.listAll().filter(predicate).sort(compare);
  }
}
