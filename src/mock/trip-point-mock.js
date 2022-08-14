import { getRandomElement } from '../utils.js';

/** Генерирует случайный тип события на маршруте */
const generatePointType = () => {
  const pointTypes = [
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

  return getRandomElement(pointTypes);
};

/** Генерирует данные для события на маршруте путешествия */
const generatePoint = () => ({
  type: generatePointType(),
  destination: '$Destination.id$',
  dateFrom: '2019-07-10T22:55:56.845Z',
  dateTo: '2019-07-11T11:22:13.375Z',
  basePrice: 222,
  offers: '$Array<Offer.id>$',
});

export { generatePoint };
