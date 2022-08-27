import RouteModel from './model/route-model.js';
import RoutePresenter from './presenter/route-presentor.js';
import EditorPresenter from './presenter/editor-presentor.js';
import './view/filter-view.js';

const routModel = new RouteModel();

new RoutePresenter(routModel);
new EditorPresenter(routModel);
