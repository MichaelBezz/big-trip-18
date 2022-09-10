import dayjs from 'dayjs';

/**
 * Вернет дату в формате 'MMM D'
 * @param {string} isoDate
 * @return {string}
 */
const formatDate = (isoDate) => dayjs(isoDate).format('MMM D');

/**
  * Вернет время в формате 'HH:mm'
  * @param {string} isoDate
  * @return {string}
  */
const formatTime = (isoDate) => dayjs(isoDate).format('HH:mm');

/**
  * Вернет дату и время в формате 'DD/MM/YY HH:mm'
  * @param {string} isoDate
  * @return {string}
  */
const formatDateWithTime = (isoDate) => dayjs(isoDate).format('DD/MM/YY HH:mm');

export {formatDate, formatTime, formatDateWithTime};
