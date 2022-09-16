import PointCreatorPresenter from './point-creator-presenter.js';
import PointView from '../view/point-view.js';

/**
 * Презентор формы редактирования
 * @template {ApplicationModel} Model
 * @template {PointEditorView} View
 * @extends {PointCreatorPresenter<Model,View>}
 */
export default class PointEditorPresenter extends PointCreatorPresenter {

  /**
   * @override
   * Обновит activePoint в модели
   */
  saveActivePoint() {
    return this.model.points.update(this.model.activePoint.id, this.activePoint);
  }

  /** Удалит activePoint из модели */
  deleteActivePoint() {
    return this.model.points.remove(this.model.activePoint.id);
  }

  /**
   * Обработает событие CREATE
   * Закроет editor-view, если модель в режиме create
   * @override
   */
  onModelCreate() {
    this.view.close(true);
  }

  /**
   * Обработает событие EDIT
   * @override
   */
  onModelEdit() {
    const pointView = PointView.findById(this.model.activePoint.id);

    this.view.close(true);

    this.updateView();

    this.view
      .target(pointView)
      .open();
  }

  /**
   * Обработает событие RESET(button DELETE)
   * @override
   * @param {Event} event
   */
  async onViewReset(event) {
    event.preventDefault();

    this.view.setDeleteButtonPressed(true);

    try {
      await this.deleteActivePoint();
      this.view.close();

    } catch (exception) {
      this.view.shake();
    }

    this.view.setDeleteButtonPressed(false);
  }
}
