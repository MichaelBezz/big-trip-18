import Type from '../enum/type.js';
import {getRandomInteger, getRandomElement} from '../utils.js';

// TODO удалить или переработать

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
  MIN: 4,
  MAX: 8
};

const generateTitle = () => getRandomElement(OFFER_TITLES);
const generatePrice = () => getRandomInteger(OfferPrise.MIN, OfferPrise.MAX);

/**
 * Сгенерирует дополнительную опцию
 * @param {number} id
 * @return {Offer}
 */
const generateOffer = (id) => ({
  id,
  title: generateTitle(),
  price: generatePrice()
});

/**
 * Сгенерирует список дополнительных опций
 * @return {Offer[]}
 */
const generateOffers = () => {
  const offerQuantity = getRandomInteger(OfferQuantity.MIN, OfferQuantity.MAX);

  return Array.from({length: offerQuantity}, (_item, index) => generateOffer(index + 1));
};

/**
 * Сгенерирует группы дополнительных опций
 * @return {OfferGroup[]}
 */
const generateOfferGroups = () =>
  Object.values(Type).map((type) => ({
    type,
    offers: generateOffers()
  }));

export {generateOfferGroups};
