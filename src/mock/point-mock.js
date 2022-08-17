import {getRandomInteger, getRandomUniqueInteger, getRandomElement} from '../utils.js';
import {POINT_TYPES} from './const-mock.js';

const PointId = {
  MIN: 1,
  MAX: 5
};

const PointPrise = {
  MIN: 10,
  MAX: 50,
  MULTIPLIER: 10
};

const generateId = getRandomUniqueInteger(PointId.MIN, PointId.MAX);

const getPrice = () => getRandomInteger(PointPrise.MIN, PointPrise.MAX) * PointPrise.MULTIPLIER;

/**
 * Генерирует событие на маршруте
 * @param {number} id
 * @return {Point}
 */
const generatePoint = (id) => ({
  id,
  type: getRandomElement(POINT_TYPES),
  destination: id,
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  basePrice: getPrice(),
  offers: [id]
});

export {generatePoint};
