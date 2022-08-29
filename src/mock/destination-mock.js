import {getRandomInteger, getRandomElement} from '../utils.js';

const POINT_NAMES = [
  'Amsterdam',
  'Geneva',
  'Chamonix'
];

const POINT_DESCRIPTIONS = [
  'Chamonix-Mont-Blanc is a resort area near the junction of France, Switzerland and Italy.',
  'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
  'At the base of Mont Blanc, the highest summit in the Alps, its renowned for its skiing.'
];

const POINT_PICTURE_DESCRIPTIONS = [
  'Chamonix parliament building.',
  'Highest summit in the Alps.',
  'Base of Mont Blanc.'
];

const PictureQuantity = {
  MIN: 1,
  MAX: 5
};

const generateName = () => getRandomElement(POINT_NAMES);
const generateDescription = () => getRandomElement(POINT_DESCRIPTIONS);
const generatePictureSrc = () => `http://picsum.photos/300/200?r=${Math.random()}`;
const generatePictureDescription = () => getRandomElement(POINT_PICTURE_DESCRIPTIONS);

/**
 * Сгенерирует список с картинками
 * @return {Picture[]}
 */
const generatePictures = () => {
  const pictureQuantity = getRandomInteger(PictureQuantity.MIN, PictureQuantity.MAX);

  const generatePicture = () => ({
    src: generatePictureSrc(),
    description: generatePictureDescription()
  });

  return Array.from({length: pictureQuantity}, generatePicture);
};

/**
 * Сгенерирует пункт назначения
 * @param {number} id
 * @return {Destination}
 */
const generateDestination = (id) => ({
  id,
  name: generateName(),
  description: generateDescription(),
  pictures: generatePictures()
});

/**
 * Сгенерирует список пунктов назначения
 * @param {number} length
 * @return {Destination[]}
 */
const generateDestinations = (length = 10) =>
  Array.from({length}, (_item, index) => generateDestination(index + 1));

export {generateDestinations};
