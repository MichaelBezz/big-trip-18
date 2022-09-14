import PointCreatorPresenter from './point-creator-presenter.js';

/**
 * Презентор формы редактирования
 * @template {ApplicationModel} Model
 * @template {PointEditorView} View
 * @extends {PointCreatorPresenter<Model,View>}
 */
export default class PointEditorPresenter extends PointCreatorPresenter {

  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.model.addEventListener('edit', this.onModelEdit.bind(this));
  }

  /** TypeSelect -> setValue */
  updateTypeSelectView() {
    this.view.pointTypeSelectView.setValue(this.model.activePoint.type);
  }

  /** DestinationSelect -> setLabel -> setDestination */
  updateDestinationSelectView() {
    const {type, destinationId} = this.model.activePoint;

    const destination = this.model.destinations.findById(destinationId);

    this.view.destinationSelectView
      .setLabel(type)
      .setDestination(destination.name);
  }

  /** DatePicker -> setDate */
  updateDatePickerView() {
    const {startDate, endDate} = this.model.activePoint;

    this.view.datePickerView.setDate(startDate, endDate);
  }

  /** PriceInput -> setPrice */
  updatePriceInputView() {
    const {basePrice} = this.model.activePoint;

    this.view.priceInputView.setPrice(String(basePrice));
  }

  /** OfferSelect -> setCheckedOptions */
  updateOfferSelectView() {
    const selectedType = this.view.pointTypeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(selectedType).items;

    const checkedOptions = availableOffers.map((offer) =>
      this.model.activePoint.offerIds.includes(offer.id)
    );

    this.view.offerSelectView.setCheckedOptions(checkedOptions);
  }

  /** Обработает событие EDIT */
  onModelEdit() {
    /** @type {PointView} */
    const point = document.querySelector(`#point-${this.model.activePoint.id}`);

    this.view.close(true);

    this.updateTypeSelectView();
    this.updateDestinationSelectView();
    this.updateDatePickerView();
    this.updatePriceInputView();
    this.buildOfferSelectView();
    this.updateOfferSelectView();
    this.updateDestinationView();

    this.view
      .target(point)
      .open();
  }

  /**
   * Обработает событие SUBMIT -> UPDATE
   * @override
   * @param {Event} event
   */
  async onViewSubmit(event) {
    event.preventDefault();

    this.view.disableSubmitButton();

    try {
      await this.model.points.update(this.model.activePoint.id, this.getFormData());
      this.view.close();

    } catch (exception) {
      // TODO shake
    }

    this.view.enableSubmitButton();
  }

  /**
   * Обработает событие RESET -> REMOVE
   * @override
   * @param {Event} event
   */
  async onViewReset(event) {
    event.preventDefault();

    this.view.disableResetButton();

    try {
      await this.model.points.remove(this.model.activePoint.id);
      this.view.close();

    } catch (exception) {
      // TODO shake
    }

    this.view.enableResetButton();
  }
}
