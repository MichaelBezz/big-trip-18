/**
 * @typedef Point
 * @prop {number} id
 * @prop {OfferType} type
 * @prop {number} destination
 * @prop {string} date_from
 * @prop {string} date_to
 * @prop {number} base_price
 * @prop {number[]} offers
 */

/**
 * @typedef LocalPoint
 * @prop {OfferType} type
 * @prop {number} destination
 * @prop {string} date_from
 * @prop {string} date_to
 * @prop {number} base_price
 * @prop {number[]} offers
 */

/**
   * @typedef AggregatedPoint
   * @prop {number} id
   * @prop {OfferType} type
   * @prop {Destination} destination
   * @prop {string} date_from
   * @prop {string} date_to
   * @prop {number} base_price
   * @prop {Offer[]} offers
 */
