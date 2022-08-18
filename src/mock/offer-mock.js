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
  MAX: 3
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
const generateOfferGroups = (id) => {
  const offerGroups = [];

  for (const type of POINT_TYPES) {
    const offerQuantity = getRandomInteger(OfferQuantity.MIN, OfferQuantity.MAX);

    const group = {
      type,
      offers: Array.from({length: offerQuantity}, () => createOffer(id))
    };

    offerGroups.push(group);
  }

  return offerGroups;
};

export {generateOfferGroups};
