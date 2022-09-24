import dayjs from 'dayjs';

/**
 * Вернет дату в формате 'MMM D'
 * @param {string} isoDate
 * @param {string} template
 * @return {string}
 */
export const formatDate = (isoDate, template = 'MMM D') => dayjs(isoDate).format(template);

/**
   * Вернет время в формате 'HH:mm'
   * @param {string} isoDate
   * @return {string}
   */
export const formatTime = (isoDate, template = 'HH:mm') => dayjs(isoDate).format(template);

/**
 * @param {number} value
 * @param {string} locale
 */
export const formatNumber = (value, locale = 'en') => value.toLocaleString(locale);
