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
 * @prop {string} id
 * @prop {number | null} index
 * @prop {string} date
 * @prop {string} startIsoDate
 * @prop {string} endIsoDate
 * @prop {string} icon
 * @prop {string} title
 * @prop {string} startTime
 * @prop {string} endTime
 * @prop {string} price
 * @prop {PointOfferState[]} offers
 */

/** @typedef {[label: string, value: string]} FilterOptionState */
/** @typedef {[label: string, value: string]} SortOptionState */
/** @typedef {[title: string, price: number]} PointOfferState */
/** @typedef {[label: string, value: string]} PointTypeOptionState */
/** @typedef {[text: string, value: string]} DestinationOptionState */
/** @typedef {[id: string, title: string, price: string, isChecked: boolean]} OfferOptionState */
/** @typedef {[src: string, alt: string]} DestinationPictureState */
