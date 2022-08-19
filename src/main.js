import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import RoutePresenter from './presenter/route-presentor.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const routeContainer = document.querySelector('.trip-events');

filterContainer.append(new FilterView);
routeContainer.append(new SortView);

const routePresenter = new RoutePresenter();
routePresenter.init(routeContainer);
