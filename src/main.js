import RouteModel from './model/route-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import RoutePresenter from './presenter/route-presenter.js';
import SortPresenter from './presenter/sort-presenter.js';
import EditorPresenter from './presenter/editor-presenter.js';

const routModel = new RouteModel();

routModel.ready().then(() => {
  new FilterPresenter(routModel);
  new RoutePresenter(routModel);
  new SortPresenter(routModel);
  new EditorPresenter(routModel);
});
