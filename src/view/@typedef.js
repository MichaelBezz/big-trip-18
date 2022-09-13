/** @typedef {import('flatpickr/dist/types/instance').Instance} Calendar */
/** @typedef {import('flatpickr/dist/types/options').Options} CalendarOptions */
/** @typedef {import('flatpickr/dist/types/options').DateOption} CalendarDate */

/** @typedef {import('./filter-view').default} FilterView */
/** @typedef {import('./sort-view').default} SortView */
/** @typedef {import('./point-list-view').default} PointListView */
/** @typedef {import('./point-view').default} PointView */
/** @typedef {import('./point-creator-view').default} PointCreatorView */
/** @typedef {import('./point-editor-view').default} PointEditorView */

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

/** @typedef {CustomEvent<PointEventData>} PointEvent */

/**
 * @typedef PointEventData
 * @prop {number} id
 */
