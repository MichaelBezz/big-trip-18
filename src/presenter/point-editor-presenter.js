import PointCreatorPresenter from './point-creator-presenter.js';
import PointView from '../view/point-view.js';

import Mode from '../enum/mode.js';

/**
 * @template {ApplicationModel} Model
 * @template {PointEditorView} View
 * @extends {PointCreatorPresenter<Model,View>}
 */
export default class PointEditorPresenter extends PointCreatorPresenter {

  /**
   * @override
   */
  saveActivePoint() {
    return this.model.pointsModel.update(this.model.activePoint.id, this.activePoint);
  }

  deleteActivePoint() {
    return this.model.pointsModel.remove(this.model.activePoint.id);
  }

  /**
   * @override
   */
  onModelMode() {
    this.view.close(false);

    if (this.model.getMode() === Mode.EDIT) {
      const pointView = PointView.findById(this.model.activePoint.id);

      this.updateView();

      this.view.target(pointView).open();
    }
  }

  /**
   * @override
   * @param {Event} event
   */
  async onViewReset(event) {
    event.preventDefault();

    this.view.setDeleting(true);

    try {
      await this.deleteActivePoint();
      this.view.close();

    } catch (exception) {
      this.view.shake();
    }

    this.view.setDeleting(false);
  }
}
