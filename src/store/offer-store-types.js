
/**
 * @typedef {'taxi' | 'bus' | 'train' | 'ship' | 'drive' | 'flight' | 'check-in' | 'sightseeing' | 'restaurant'} OfferType
 */

/**
 * @typedef Offer
 * @prop {number} id
 * @prop {string} title
 * @prop {number} price
 */

/**
 * @typedef OfferGroup
 * @prop {OfferType} type
 * @prop {Offer[]} offers
 */
