import RouteModel from './model/route-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import RoutePresenter from './presenter/route-presentor.js';
import EditorPresenter from './presenter/editor-presentor.js';

const routModel = new RouteModel();

routModel.ready().then(() => {
  new FilterPresenter(routModel);
  new RoutePresenter(routModel);
  new EditorPresenter(routModel);
});
