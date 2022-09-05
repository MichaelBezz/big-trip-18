import Adapter from './adapter.js';

export default class PointAdapter extends Adapter {
  /**
   * @param {Point} point
   */
  constructor(point) {
    super();

    this.id = Number(point.id);
    this.type = point.type;
    this.destinationId = point.destination;
    this.startDate = point.date_from;
    this.endDate = point.date_to;
    this.basePrice = point.base_price;
    this.offerIds = point.offers;
  }

  /**
   * @override
   * @return {Point}
   */
  toJSON() {
    return {
      'id': String(this.id),
      'type': this.type,
      'destination': this.destinationId,
      'date_from': this.startDate,
      'date_to': this.endDate,
      'base_price': this.basePrice,
      'offers': this.offerIds
    };
  }
}
