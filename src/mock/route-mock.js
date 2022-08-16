// import { getRandomElement } from '../utils.js';

/** Генерирует случайный тип точки */
// const generatePointType = () => {
//   const pointTypes = [
//     'taxi',
//     'bus',
//     'train',
//     'ship',
//     'drive',
//     'flight',
//     'check-in',
//     'sightseeing',
//     'restaurant'
//   ];

//   return getRandomElement(pointTypes);
// };

/**
 * Создает дополнительную опцию
 * @param {number} id
 * @return {Offer}
 */
const createOffer = (id) => ({
  id,
  title: 'Upgrade to a business class',
  price: 120
});

/**
 * Генерирует список дополнительных опций
 * @return {OfferGroup}
 */
const generateOfferGroup = () => ({
  type: 'bus',
  offers: [
    createOffer(0)
  ]
});

/**
 * Генерирует пункт назначения
 * @param {number} id
 * @return {Destination}
 */
const generateDestination = (id) => ({
  id,
  name: 'Chamonix',
  description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
  pictures: [
    {
      src: 'http://picsum.photos/300/200?r=0.0762563005163317',
      description: 'Chamonix parliament building'
    }
  ]
});

/**
 * Генерирует событие на маршруте
 * @param {number} id
 * @return {Point}
 */
const generatePoint = (id) => ({
  'id': id,
  'type': 'bus',
  'destination': id,
  'date_from': '2019-07-10T22:55:56.845Z',
  'date_to': '2019-07-11T11:22:13.375Z',
  'base_price': 222,
  'offers': [id]
});

export {generateOfferGroup, generateDestination, generatePoint};
