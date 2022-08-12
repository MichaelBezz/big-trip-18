import FilterView from './view/trip-filter-view.js';
import TripRoutePresenter from './presenter/trip-route-presentor.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const routeContainer = document.querySelector('.trip-events');

filterContainer.append(new FilterView);

const tripRoutePresenter = new TripRoutePresenter();
tripRoutePresenter.init(routeContainer);
