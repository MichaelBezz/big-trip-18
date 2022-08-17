import dayjs from 'dayjs';

/**
 * Получает случайное положительное число
 * @param {number} a
 * @param {number} b
 */
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/** Получает случайный элемент из массива данных */
const getRandomElement = (elements) => {
  const randomIndex = getRandomInteger(0, elements.length - 1);
  return elements[randomIndex];
};

/**
 * Возвращает случайный id
 * @param {number} min
 * @param {number} max
 */
const getRandomId = (min, max) => {
  const previousValues = [];

  return () => {
    let currentValue = getRandomInteger(min, max);

    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

/**
 * Возврашает дату в формате 'MMM YY'
 * @param {string} isoDate
 * @return {string}
 */
const formatDate = (isoDate) => dayjs(isoDate).format('MMM YY');

/**
 * Возвращает время в формате 'HH:mm'
 * @param {string} isoDate
 * @return {string}
 */
const formatTime = (isoDate) => dayjs(isoDate).format('HH:mm');

export {getRandomInteger, getRandomElement, getRandomId, formatDate, formatTime};
