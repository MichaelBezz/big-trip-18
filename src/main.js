import { render } from './render.js';
import FilterView from './view/filter-view.js';

const header = document.querySelector('.page-header');
const filter = header.querySelector('.trip-controls__filters');

render(new FilterView(), filter);
