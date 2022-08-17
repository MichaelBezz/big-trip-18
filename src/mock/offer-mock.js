import {getRandomInteger, getRandomElement} from '../utils.js';
import {POINT_TYPES} from './const-mock.js';

const OFFER_TITLES = [
  'Order Uber',
  'Add luggage',
  'Switch to comfort',
  'Rent a car',
  'Add breakfast'
];

const OfferPrise = {
  MIN: 10,
  MAX: 50
};

const OfferQuantity = {
  MIN: 1,
  MAX: 5
};

/**
 * Создает дополнительную опцию
 * @param {number} id
 * @return {Offer}
 */
const createOffer = (id) => ({
  id,
  title: getRandomElement(OFFER_TITLES),
  price: getRandomInteger(OfferPrise.MIN, OfferPrise.MAX)
});

/**
 * Генерирует список дополнительных опций
 * @return {OfferGroup}
 */
const generateOfferGroup = (id) => {
  const offerGroups = [];

  for (const type of POINT_TYPES) {
    const getOfferQuantity = getRandomInteger(OfferQuantity.MIN, OfferQuantity.MAX);

    const group = {
      type,
      offers: Array.from({length: getOfferQuantity}, () => createOffer(id))
    };

    offerGroups.push(group);
  }

  return offerGroups;
};

export {generateOfferGroup};
