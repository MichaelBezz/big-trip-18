import dayjs from 'dayjs';

/**
 * Получит случайное положительное число
 * @param {number} a
 * @param {number} b
 */
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/** Получит случайный элемент из массива данных */
const getRandomElement = (elements) => {
  const randomIndex = getRandomInteger(0, elements.length - 1);
  return elements[randomIndex];
};

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

export {getRandomInteger, getRandomElement, formatDate, formatTime, formatDateWithTime};
