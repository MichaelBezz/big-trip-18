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

const getPictures = (min, max) => {
  const getPictureQuantity = getRandomInteger(min, max);

  const createPicture = () => ({
    src: `http://picsum.photos/300/200?r=${Math.random()}`,
    description: getRandomElement(POINT_PICTURE_DESCRIPTIONS)
  });

  return Array.from({length: getPictureQuantity}, createPicture);
};

/**
 * Генерирует пункт назначения
 * @param {number} id
 * @return {Destination}
 */
const generateDestination = (id) => ({
  id,
  name: getRandomElement(POINT_NAMES),
  description: getRandomElement(POINT_DESCRIPTIONS),
  pictures: getPictures(PictureQuantity.MIN, PictureQuantity.MAX)
});

export {generateDestination};
