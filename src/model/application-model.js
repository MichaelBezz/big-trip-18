import Model from './model.js';

import Mode from '../enum/mode.js';
import PointType from '../enum/point-type.js';

/** Модель приложения */
export default class ApplicationModel extends Model {

  /** @type {number} */
  #mode;

  /**
   * @param {DataTableModel<Point,PointAdapter>} pointsModel
   * @param {CollectionModel<Destination,DestinationAdapter>} destinationsModel
   * @param {CollectionModel<OfferGroup,OfferGroupAdapter>} offerGroupsModel
   */
  constructor(pointsModel, destinationsModel, offerGroupsModel) {
    super();

    this.pointsModel = pointsModel;
    this.activePoint = null;
    this.destinationsModel = destinationsModel;
    this.offerGroupsModel = offerGroupsModel;
  }

  get defaultPoint() {
    const point = this.pointsModel.blank;

    point.type = PointType.TAXI;
    point.destinationId = this.destinationsModel.item(0).id;
    point.startDate = new Date().toJSON();
    point.endDate = point.startDate;
    point.basePrice = 0;
    point.offerIds = [];
    point.isFavorite = false;

    return point;
  }

  /** @override */
  async ready() {
    await Promise.all([
      this.pointsModel.ready(),
      this.destinationsModel.ready(),
      this.offerGroupsModel.ready()
    ]);
  }

  /**
   * Установит режим модели
   * @param {number} mode
   * @param {string} activePointId
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
        this.activePoint = this.pointsModel.findById(activePointId);
        break;
      default:
        throw new Error('Invalid mode');
    }

    this.dispatchEvent(new CustomEvent('mode'));
  }

  /** Получит режим модели */
  getMode() {
    return this.#mode;
  }
}
