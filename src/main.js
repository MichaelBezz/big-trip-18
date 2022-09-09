import Store from './store/store.js';

import PointAdapter from './adapter/point-adapter.js';
import DestinationAdapter from './adapter/destination-adapter.js';
import OfferGroupAdapter from './adapter/offer-group-adapter.js';

import ApplicationModel from './model/application-model.js';
import CollectionModel from './model/collection-model.js';
import DataTableModel from './model/data-table-model.js';

import FilterSelectView from './view/filter-select-view.js';
import PlaceholderView from './view/placeholder-view.js';
import SortSelectView from './view/sort-select-view.js';
import PointListView from './view/point-list-view.js';
import PointEditorView from './view/point-editor-view.js';

import FilterSelectPresenter from './presenter/filter-select-presenter.js';
import PlaceholderPresenter from './presenter/placeholder-presenter.js';
import SortSelectPresenter from './presenter/sort-select-presenter.js';
import PointListPresenter from './presenter/point-list-presenter.js';
import PointEditorPresenter from './presenter/point-editor-presenter.js';

const BASE_URL = 'https://18.ecmascript.pages.academy/big-trip';
const POINTS_URL = `${BASE_URL}/points`;
const DESTINATIONS_URL = `${BASE_URL}/destinations`;
const OFFERS_URL = `${BASE_URL}/offers`;
const AUTH = 'Basic er883jdd';

/** @type {Store<Point>} */
const pointStore = new Store(POINTS_URL, AUTH);

/** @type {Store<Destination>} */
const destinationsStore = new Store(DESTINATIONS_URL, AUTH);

/** @type {Store<OfferGroup>} */
const offersStore = new Store(OFFERS_URL, AUTH);

const points = new DataTableModel(pointStore, (point) => new PointAdapter(point));
const destinations = new CollectionModel(destinationsStore, (destination) => new DestinationAdapter(destination));
const offerGroups = new CollectionModel(offersStore, (offerGroup) => new OfferGroupAdapter(offerGroup));

const applicationModel = new ApplicationModel(points, destinations, offerGroups);

/** @type {FilterSelectView} */
const filterSelectView = document.querySelector(String(FilterSelectView));

/** @type {PlaceholderView} */
const placeholderView = document.querySelector(String(PlaceholderView));

/** @type {SortSelectView} */
const sortSelectView = document.querySelector(String(SortSelectView));

/** @type {PointListView} */
const pointListView = document.querySelector(String(PointListView));

/** @type {PointEditorView} */
const pointEditorView = new PointEditorView();

applicationModel.ready().then(() => {
  new FilterSelectPresenter(applicationModel, filterSelectView);
  new PlaceholderPresenter(applicationModel, placeholderView);
  new SortSelectPresenter(applicationModel, sortSelectView);
  new PointListPresenter(applicationModel, pointListView);
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
