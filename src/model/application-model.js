import Model from './model.js';

import Mode from '../enum/mode.js';

/** Модель приложения */
export default class ApplicationModel extends Model {

  /** @type {number} */
  #mode;

  /**
   * @param {DataTableModel<Point,PointAdapter>} points
   * @param {CollectionModel<Destination,DestinationAdapter>} destinations
   * @param {CollectionModel<OfferGroup,OfferGroupAdapter>} offerGroups
   */
  constructor(points, destinations, offerGroups) {
    super();

    this.points = points;
    this.activePoint = null;
    this.destinations = destinations;
    this.offerGroups = offerGroups;
  }

  /** override */
  async ready() {
    await Promise.all([
      this.points.ready(),
      this.destinations.ready(),
      this.offerGroups.ready()
    ]);
  }

  /**
   * Установит режим модели
   * @param {number} mode
   * @param {number} editablePointId
   */
  setMode(mode, editablePointId = null) {
    this.#mode = mode;
    this.activePoint = this.points.findById(editablePointId);

    const eventType = Mode.findKey(mode).toLowerCase();
    this.dispatchEvent(new CustomEvent(eventType));
  }

  /** Получит режим модели */
  getMode() {
    return this.#mode;
  }
}
