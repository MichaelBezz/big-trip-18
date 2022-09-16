import Model from './model.js';

import Mode from '../enum/mode.js';
import PointType from '../enum/point-type.js';

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

  get defaultPoint() {
    const point = this.points.blank;

    point.type = PointType.TAXI;
    point.destinationId = this.destinations.item(0).id;
    point.startDate = new Date().toJSON();
    point.endDate = point.startDate;
    point.basePrice = 0;
    point.offerIds = [];
    point.isFavorite = false;

    return point;
  }

  /**
   * Установит режим модели
   * @param {number} mode
   * @param {number} activePointId
   */
  setMode(mode, activePointId = null) {
    this.#mode = mode;

    switch(mode) {
      case Mode.VIEW:
        this.activePoint = null;
        break;
      case Mode.CREATE:
        this.activePoint = this.defaultPoint;
        break;
      case Mode.EDIT:
        this.activePoint = this.points.findById(activePointId);
        break;
      default:
        throw new Error('Invalid mode');
    }

    const eventType = Mode.findKey(mode).toLowerCase();
    this.dispatchEvent(new CustomEvent(eventType));
  }

  /** Получит режим модели */
  getMode() {
    return this.#mode;
  }
}
