/**
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
   * Получит список Item
   * @return {Promise<Item[]>}
   */
  list() {
    return this.request('/', {
      method: 'get'
    });
  }

  /**
   * Добавит Item
   * @param {Item} item
   * @return {Promise<Item>}
   */
  add(item) {
    return this.request('/', {
      method: 'post',
      body: JSON.stringify(item)
    });
  }

  /**
   * Обновит Item
   * @param {string} id
   * @param {Item} item
   * @return {Promise<Item>}
   */
  update(id, item) {
    return this.request(`/${id}`, {
      method: 'put',
      body: JSON.stringify(item)
    });
  }

  /**
   * Удалит Item
   * @param {string} id
   * @return {Promise<Item>}
   */
  remove(id) {
    return this.request(`/${id}`, {
      method: 'delete'
    });
  }

  /**
   * @param {string} path
   * @param {RequestInit} options
   */
  async request(path, options = {}) {
    const url = this.#baseUrl + path;

    const headers = {
      'authorization': this.#auth,
      'content-type': 'application/json',
      ...options.headers
    };

    const response = await fetch(url, {...options, headers});

    const {assert, parse} = /** @type {typeof Store} */(this.constructor);

    await assert(response);

    return parse(response);
  }

  /**
   * @param {Response} response
   */
  static async assert(response) {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  /**
   * @param {Response} response
   */
  static parse(response) {
    if (response.headers.get('content-type').startsWith('application/json')) {
      return response.json();
    }

    return response.text();
  }
}
