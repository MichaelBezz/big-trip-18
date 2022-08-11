import { render } from './render.js';
import FilterView from './view/filter-view.js';
import TripPresenter from './presenter/trip-presentor.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripContainer = document.querySelector('.trip-events');
const tripPresenter = new TripPresenter();

render(new FilterView(), filterContainer);
tripPresenter.init(tripContainer);
