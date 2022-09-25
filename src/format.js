import dayjs from 'dayjs';

/**
 * Вернет дату в формате `MMM D`
 * @param {string} isoDate
 */
export const formatDate = (isoDate, template = 'MMM D') => dayjs(isoDate).format(template);

/**
   * Вернет время в формате `HH:mm`
   * @param {string} isoDate
   */
export const formatTime = (isoDate, template = 'HH:mm') => dayjs(isoDate).format(template);

/**
 * @param {number} value
 */
export const formatNumber = (value, locale = 'en') => value.toLocaleString(locale);
