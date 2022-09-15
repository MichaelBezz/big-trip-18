import StoreError from './store-error.js';

/**
 * Generic Store
 * Интерфейс для работы с сервером
 * @template Item
 */
export default class Store {
  #baseUrl;
  #auth;

  /**
   * @param {string} baseUrl
   * @param {string} auth
   */
  constructor(baseUrl, auth) {
    this.#baseUrl = baseUrl;
    this.#auth = auth;
  }

  /**
   * @param {string} path
   * @param {RequestInit} options
   */
  #request(path, options = {}) {
    const url = this.#baseUrl + path;

    const headers = {
      'authorization': this.#auth,
      'content-type': 'application/json',
      ...options.headers
    };

    return fetch(url, {...options, headers}).then((response) => {
      if (!response.ok) {
        throw new StoreError(response);
      }

      if (response.headers.get('content-type').startsWith('text/plain')) {
        return response.text();
      }

      return response.json();
    });
  }

  /**
   * Получит список Item
   * @return {Promise<Item[]>}
   */
  list() {
    return this.#request('/', {
      method: 'get'
    });
  }

  /**
   * Добавит Item
   * @param {Item} item
   * @return {Promise<Item>}
   */
  add(item) {
    return this.#request('/', {
      method: 'post',
      body: JSON.stringify(item)
    });
  }

  /**
   * Обновит Item
   * @param {ItemId} id
   * @param {Item} item
   * @return {Promise<Item>}
   */
  update(id, item) {
    return this.#request(`/${id}`, {
      method: 'put',
      body: JSON.stringify(item)
    });
  }

  /**
   * Удалит Item
   * @param {ItemId} id
   * @return {Promise<Item>}
   */
  remove(id) {
    return this.#request(`/${id}`, {
      method: 'delete'
    });
  }
}
