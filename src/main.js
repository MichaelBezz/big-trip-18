import FilterView from './view/filter-view.js';
import RoutePresenter from './presenter/route-presentor.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const routeContainer = document.querySelector('.trip-events');

filterContainer.append(new FilterView);

const routePresenter = new RoutePresenter(routeContainer);
routePresenter.init();
