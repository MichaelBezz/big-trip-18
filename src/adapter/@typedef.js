/** @typedef {import('./adapter').default} Adapter */
/** @typedef {import('./point-adapter').default} PointAdapter */
/** @typedef {import('./destination-adapter').default} DestinationAdapter */
/** @typedef {import('./offer-group-adapter').default} OfferGroupAdapter */

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

/**
 * @typedef Destination
 * @prop {number} id
 * @prop {string} name
 * @prop {string} description
 * @prop {Picture[]} pictures
 */

/**
 * @typedef Picture
 * @prop {string} src
 * @prop {string} description
 */

/**
 * @typedef Offer
 * @prop {number} id
 * @prop {string} title
 * @prop {number} price
 */

/**
 * @typedef OfferGroup
 * @prop {PointType} type
 * @prop {Offer[]} offers
 */
