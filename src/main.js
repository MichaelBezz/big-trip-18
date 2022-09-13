import Store from './store/store.js';

import PointAdapter from './adapter/point-adapter.js';
import DestinationAdapter from './adapter/destination-adapter.js';
import OfferGroupAdapter from './adapter/offer-group-adapter.js';

import ApplicationModel from './model/application-model.js';
import CollectionModel from './model/collection-model.js';
import DataTableModel from './model/data-table-model.js';

import FilterView from './view/filter-view.js';
import SortView from './view/sort-view.js';
import ListView from './view/list-view.js';
import CreatorView from './view/creator-view.js';
import EditorView from './view/editor-view.js';

import FilterPresenter from './presenter/filter-presenter.js';
import SortPresenter from './presenter/sort-presenter.js';
import ListPresenter from './presenter/list-presenter.js';
import CreatorPresenter from './presenter/creator-presenter.js';
import EditorPresenter from './presenter/editor-presenter.js';

import CreateButtonPresenter from './presenter/create-button-presenter.js';
import PlaceholderPresenter from './presenter/placeholder-presenter.js';

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

/** @type {HTMLButtonElement} */
const createButtonView = document.querySelector('.trip-main__event-add-btn');

/** @type {FilterView} */
const filterView = document.querySelector(String(FilterView));

/** @type {HTMLParagraphElement} */
const placeholderView = document.querySelector('.trip-events__msg');

/** @type {SortView} */
const sortView = document.querySelector(String(SortView));

/** @type {ListView} */
const listView = document.querySelector(String(ListView));

/** @type {CreatorView} */
const creatorView = new CreatorView();

/** @type {EditorView} */
const editorView = new EditorView();

applicationModel.ready().then(() => {
  new CreateButtonPresenter(applicationModel, createButtonView);
  new FilterPresenter(applicationModel, filterView);
  new PlaceholderPresenter(applicationModel, placeholderView);
  new SortPresenter(applicationModel, sortView);
  new ListPresenter(applicationModel, listView);
  new CreatorPresenter(applicationModel, creatorView);
  new EditorPresenter(applicationModel, editorView);
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

//TODO перенести типы в typedef
//TODO сделать creator
