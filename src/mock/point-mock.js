import {getRandomInteger, getRandomElement} from '../utils.js';
import {POINT_TYPES} from './const-mock.js';
import dayjs from 'dayjs';

const PointPrise = {
  MIN: 10,
  MAX: 50,
  MULTIPLIER: 10
};

const PointDate = {
  MIN_HOUR: 1,
  MAX_HOUR: 7,
  MIN_DAY: 1,
  MAX_DAY: 7
};

const createDate = () => {
  const hoursGap = getRandomInteger(PointDate.MIN_HOUR, PointDate.MAX_HOUR);
  const daysGap = getRandomInteger(PointDate.MIN_DAY, PointDate.MAX_DAY);

  const getDate = dayjs().add(daysGap, 'day').toDate();

  return ({
    from: getDate,
    to: getDate
  });
};

console.log(createDate());

const getPrice = () => getRandomInteger(PointPrise.MIN, PointPrise.MAX) * PointPrise.MULTIPLIER;

/**
 * Генерирует событие на маршруте
 * @param {number} id
 * @return {Point}
 */
const generatePoint = (id) => {
  const date = createDate();

  return({
    id,
    type: getRandomElement(POINT_TYPES),
    destination: id,
    dateFrom: date.from,
    dateTo: date.to,
    basePrice: getPrice(),
    offers: [id]
  });
};

export {generatePoint};
