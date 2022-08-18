import {getRandomUniqueInteger} from '../utils.js';

const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];

const PointId = {
  MIN: 1,
  MAX: 5
};

const generateId = getRandomUniqueInteger(PointId.MIN, PointId.MAX);

export {POINT_TYPES, generateId};
