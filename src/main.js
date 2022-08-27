import FilterView from './view/filter-view.js';
import RoutePresenter from './presenter/route-presentor.js';

const filterContainer = document.querySelector('.trip-controls__filters');
filterContainer.append(new FilterView);

const routePresenter = new RoutePresenter();
routePresenter.init();
