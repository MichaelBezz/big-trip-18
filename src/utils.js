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
 * Вернет дату в определенном формате
 * @param {string} isoDate
 * @param {string} format
 * @return {string}
 */
const formatDate = (isoDate, format) => dayjs(isoDate).format(format);

export {getRandomInteger, getRandomElement, formatDate};
