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

const generateTitle = () => getRandomElement(OFFER_TITLES);
const generatePrice = () => getRandomInteger(OfferPrise.MIN, OfferPrise.MAX);

/**
 * Генерирует дополнительную опцию
 * @param {number} id
 * @return {Offer}
 */
const generateOffer = (id) => ({
  id,
  title: generateTitle(),
  price: generatePrice()
});

/**
 * Генерирует список дополнительных опций
 * @param {number} min
 * @param {number} max
 * @returns {Offer[]}
 */
const generateOffers = () => {
  const offerQuantity = getRandomInteger(OfferQuantity.MIN, OfferQuantity.MAX);

  return Array.from({length: offerQuantity}, (_item, index) => generateOffer(index + 1));
};

/**
 * Генерирует группы дополнительных опций
 * @return {OfferGroup}
 */
const generateOfferGroups = () =>
  POINT_TYPES.map((type) => ({
    type,
    offers: generateOffers()
  }));

export {generateOfferGroups};