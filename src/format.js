import dayjs from 'dayjs';

/**
 * @param {string} isoDate
 * @param {string} format
 */
export const formatDate = (isoDate, format) => dayjs(isoDate).format(format);

/**
 * @param {number} value
 * @param {string} locale
 */
export const formatNumber = (value, locale = 'en') => value.toLocaleString(locale);
