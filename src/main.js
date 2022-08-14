import TripPointModel from './model/trip-point-model.js';
import TripFilterView from './view/trip-filter-view.js';
import TripSortView from './view/trip-sort-view.js';
import TripRoutePresenter from './presenter/trip-route-presentor.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const routeContainer = document.querySelector('.trip-events');

filterContainer.append(new TripFilterView);
routeContainer.append(new TripSortView);

const tripPointModel = new TripPointModel();
const tripRoutePresenter = new TripRoutePresenter();

tripRoutePresenter.init(routeContainer, tripPointModel);
