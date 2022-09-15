import dayjs from 'dayjs';
import UnitFormat from './enum/unit-format';

/**
 * Вернет дату в формате 'MMM D'
 * @param {string} isoDate
 * @return {string}
 */
const formatDate = (isoDate) => dayjs(isoDate).format(UnitFormat.DATE);

/**
  * Вернет время в формате 'HH:mm'
  * @param {string} isoDate
  * @return {string}
  */
const formatTime = (isoDate) => dayjs(isoDate).format(UnitFormat.TIME);

export {formatDate, formatTime};
