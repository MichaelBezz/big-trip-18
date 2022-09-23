import Adapter from './adapter.js';

export default class PointAdapter extends Adapter {
  /**
   * @param {Partial<Point>} point
   */
  constructor(point = {}) {
    super();

    this.id = point.id;
    this.type = point.type;
    this.destinationId = String(point.destination);
    this.startDate = point.date_from;
    this.endDate = point.date_to;
    this.basePrice = point.base_price;
    this.offerIds = point.offers?.map(String);
    this.isFavorite = point.is_favorite;
  }

  /**
   * @override
   * @return {Partial<Point>}
   */
  toJSON() {
    return {
      'id': this.id,
      'type': this.type,
      'destination': Number(this.destinationId),
      'date_from': this.startDate,
      'date_to': this.endDate,
      'base_price': this.basePrice,
      'offers': this.offerIds?.map(Number),
      'is_favorite': this.isFavorite
    };
  }
}
