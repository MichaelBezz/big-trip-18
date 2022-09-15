import Store from './store/store.js';

import PointAdapter from './adapter/point-adapter.js';
import DestinationAdapter from './adapter/destination-adapter.js';
import OfferGroupAdapter from './adapter/offer-group-adapter.js';

import ApplicationModel from './model/application-model.js';
import CollectionModel from './model/collection-model.js';
import DataTableModel from './model/data-table-model.js';

import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import PointListView from './view/point-list-view.js';
import PointCreatorView from './view/point-creator-view.js';
import PointEditorView from './view/point-editor-view.js';

import CreateButtonPresenter from './presenter/create-button-presenter.js';
import PlaceholderPresenter from './presenter/placeholder-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import SortPresenter from './presenter/sort-presenter.js';
import PointListPresenter from './presenter/point-list-presenter.js';
import PointCreatorPresenter from './presenter/point-creator-presenter.js';
import PointEditorPresenter from './presenter/point-editor-presenter.js';

import FilterPredicate from './enum/filter-predicate.js';
import SortCompare from './enum/sort-compare.js';

const BASE_URL = 'https://18.ecmascript.pages.academy/big-trip';
const POINTS_URL = `${BASE_URL}/points`;
const DESTINATIONS_URL = `${BASE_URL}/destinations`;
const OFFERS_URL = `${BASE_URL}/offers`;
const AUTH = 'Basic er883jde';

/** @type {Store<Point>} */
const pointStore = new Store(POINTS_URL, AUTH);

/** @type {Store<Destination>} */
const destinationsStore = new Store(DESTINATIONS_URL, AUTH);

/** @type {Store<OfferGroup>} */
const offersStore = new Store(OFFERS_URL, AUTH);

const points = new DataTableModel(pointStore, (point) => new PointAdapter(point))
  .setFilter(FilterPredicate.EVERYTHING)
  .setSort(SortCompare.DAY);

const destinations = new CollectionModel(destinationsStore, (destination) => new DestinationAdapter(destination));

const offerGroups = new CollectionModel(offersStore, (offerGroup) => new OfferGroupAdapter(offerGroup));

const applicationModel = new ApplicationModel(points, destinations, offerGroups);

/** @type {HTMLButtonElement} */
const createButtonView = document.querySelector('.trip-main__event-add-btn');

/** @type {HTMLParagraphElement} */
const placeholderView = document.querySelector('.trip-events__msg');

/** @type {FilterView} */
const filterView = document.querySelector(String(FilterView));

/** @type {SortView} */
const sortView = document.querySelector(String(SortView));

/** @type {PointListView} */
const pointListView = document.querySelector(String(PointListView));

/** @type {PointCreatorView} */
const pointCreatorView = new PointCreatorView().target(pointListView);

/** @type {PointEditorView} */
const pointEditorView = new PointEditorView();

applicationModel.ready().then(() => {
  new CreateButtonPresenter(applicationModel, createButtonView);
  new PlaceholderPresenter(applicationModel, placeholderView);
  new FilterPresenter(applicationModel, filterView);
  new SortPresenter(applicationModel, sortView);
  new PointListPresenter(applicationModel, pointListView);
  new PointCreatorPresenter(applicationModel, pointCreatorView);
  new PointEditorPresenter(applicationModel, pointEditorView);
});


// TODO debug
const {group, groupEnd, trace} = console;

applicationModel.addEventListener(['view', 'create', 'edit'], (event) => {
  groupEnd(); // уберет вложенность
  group(event.type); // группировка
});

applicationModel.points.addEventListener(['add', 'update', 'remove', 'filter', 'sort'], (event) => {
  trace(event.type);
});
