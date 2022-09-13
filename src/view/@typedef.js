/** @typedef {import('flatpickr/dist/types/instance').Instance} Calendar */
/** @typedef {import('flatpickr/dist/types/options').Options} CalendarOptions */
/** @typedef {import('flatpickr/dist/types/options').DateOption} CalendarDate */

/** @typedef {import('./filter-view').default} FilterView */
/** @typedef {import('./sort-view').default} SortView */
/** @typedef {import('./list-view').default} ListView */
/** @typedef {import('./point-view').default} PointView */
/** @typedef {import('./creator-view').default} CreatorView */
/** @typedef {import('./editor-view').default} EditorView */

/**
 * @typedef PointState
 * @prop {number} id
 * @prop {string} date
 * @prop {string} startIsoDate
 * @prop {string} endIsoDate
 * @prop {string} icon
 * @prop {string} title
 * @prop {string} startTime
 * @prop {string} endTime
 * @prop {number} price
 * @prop {PointOfferState[]} offers
 */

/** @typedef {[label: string, value: string]} FilterOptionState */
/** @typedef {[label: string, value: string]} SortOptionState */
/** @typedef {[title: string, price: number]} PointOfferState */
/** @typedef {[label: string, value: string]} TypeOptionState */
/** @typedef {[text: string, value: string]} DestinationOptionState */
/** @typedef {[id: number, title: string, price: number, isChecked: boolean]} OfferOptionState */
/** @typedef {[src: string, alt: string]} DestinationPictureState */
