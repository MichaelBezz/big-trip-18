/**
 * @typedef Point
 * @prop {string} id
 * @prop {PointType} type
 * @prop {number} destination
 * @prop {string} date_from
 * @prop {string} date_to
 * @prop {number} base_price
 * @prop {number[]} offers
 */

/**
 * @typedef LocalPoint
 * @prop {PointType} type
 * @prop {number} destination
 * @prop {string} date_from
 * @prop {string} date_to
 * @prop {number} base_price
 * @prop {number[]} offers
 */

/**
 * @typedef {'taxi' | 'bus' | 'train' | 'ship' | 'drive' | 'flight' | 'check-in' | 'sightseeing' | 'restaurant'} PointType
 */
