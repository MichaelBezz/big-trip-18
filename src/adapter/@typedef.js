/** @typedef {import('./adapter').default} Adapter */
/** @typedef {import('./point-adapter').default} PointAdapter */
/** @typedef {import('./destination-adapter').default} DestinationAdapter */
/** @typedef {import('./offer-group-adapter').default} OfferGroupAdapter */

/**
 * @typedef Point
 * @prop {string} id
 * @prop {string} type
 * @prop {number} destination
 * @prop {string} date_from
 * @prop {string} date_to
 * @prop {number} base_price
 * @prop {number[]} offers
 * @prop {boolean} is_favorite
 */

/**
 * @typedef Destination
 * @prop {number} id
 * @prop {string} name
 * @prop {string} description
 * @prop {DestinationPicture[]} pictures
 */

/**
 * @typedef DestinationPicture
 * @prop {string} src
 * @prop {string} description
 */

/**
 * @typedef OfferGroup
 * @prop {string} type
 * @prop {Offer[]} offers
 */

/**
 * @typedef Offer
 * @prop {number} id
 * @prop {string} title
 * @prop {number} price
 */
