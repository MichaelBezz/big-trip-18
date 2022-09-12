import Presenter from './presenter.js';
import PointAdapter from '../adapter/point-adapter.js';

import Mode from '../enum/mode.js';
import Type from '../enum/type.js';
import TypeLabel from '../enum/type-label.js';

/**
 * Презентор формы редактирования
 * @template {ApplicationModel} Model
 * @template {PointEditorView} View
 * @extends {Presenter<Model,View>}
 */
export default class PointEditorPresenter extends Presenter {

  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.buildTypeSelectView();
    this.buildDestinationSelectView();
    this.buildDayDatePickerView();

    this.model.addEventListener('edit', this.onPointEdit.bind(this));
    this.view.addEventListener('reset', this.onPointEditorReset.bind(this));
    this.view.addEventListener('submit', this.onPointEditorSubmit.bind(this));
    this.view.addEventListener('close', () => this.model.setMode(Mode.VIEW));
    this.view.typeSelectView.addEventListener('change', this.onTypeSelectChange.bind(this));
    this.view.destinationSelectView.addEventListener('change', this.onDestinationSelectChange.bind(this));
  }

  buildTypeSelectView() {
    /** @type {TypeOptionState[]} */
    const optionStates = Object.values(Type).map((type) => {
      const key = Type.findKey(type);
      const label = TypeLabel[key];

      return [label, type];
    });

    this.view.typeSelectView.setOptions(optionStates);
  }

  buildDestinationSelectView() {
    const destinationNames = this.model.destinations
      .listAll()
      .map((destination) => destination.name);

    /** @type {DestinationOptionState[]} */
    const optionStates = [...new Set(destinationNames)].map((name) => ['', name]);

    this.view.destinationSelectView.setOptions(optionStates);
  }

  buildDayDatePickerView() {
    const calendarOptions = {
      dateFormat: 'd/m/y H:i',
      locale: {firstDayOfWeek: 1}
    };

    this.view.datePickerView.configure(calendarOptions);
  }

  updateTypeSelectView() {
    this.view.typeSelectView.setValue(this.model.editablePoint.type);
  }

  updateDestinationSelectView() {
    const {type, destinationId} = this.model.editablePoint;

    const destination = this.model.destinations.findById(destinationId);

    this.view.destinationSelectView
      .setLabel(type)
      .setDestination(destination.name);
  }

  updateDatePickerView() {
    const {startDate, endDate} = this.model.editablePoint;

    this.view.datePickerView.setDate(startDate, endDate);
  }

  updatePriceInputView() {
    const {basePrice} = this.model.editablePoint;

    this.view.priceInputView.setPrice(String(basePrice));
  }

  updateOfferSelectView() {
    const selectedType = this.view.typeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(selectedType).items;

    if (!availableOffers.length) {
      this.view.offerSelectView.hidden = true;
      return;
    }

    this.view.offerSelectView.hidden = false;

    /** @type {OfferOptionState[]} */
    const optionStates = availableOffers.map((offer) => {
      const {id, title, price} = offer;
      const isChecked = this.model.editablePoint.offerIds.includes(id);

      return [id, title, price, isChecked];
    });

    this.view.offerSelectView
      .setOptions(optionStates);
  }

  updateDestinationDetailsView() {
    const selectedDestinationName = this.view.destinationSelectView.getDestination();
    const destination = this.model.destinations.findBy('name', selectedDestinationName);

    if (!destination) {
      this.view.destinationDetailsView.hidden = true;
      return;
    }

    this.view.destinationDetailsView.hidden = false;

    /** @type {DestinationPictureState[]} */
    const pictureStates = destination.pictures.map((picture) => [picture.src, picture.description]);

    this.view.destinationDetailsView
      .setDescription(destination.description)
      .setPictures(pictureStates);
  }

  getFormData() {
    const point = new PointAdapter();

    const destinationName = this.view.destinationSelectView.getDestination();
    const [startDate, endDate] = this.view.datePickerView.getDates();

    point.type = this.view.typeSelectView.getValue();
    point.destinationId = this.model.destinations.findBy('name', destinationName)?.id;
    point.startDate = startDate;
    point.endDate = endDate;
    point.basePrice = Number(this.view.priceInputView.getPrice());
    point.offerIds = this.view.offerSelectView.getSelectedValues().map(Number);
    point.isFavorite = false;

    return point;
  }

  onTypeSelectChange() {
    const value = this.view.typeSelectView.getValue();
    const key = Type.findKey(value);

    this.view.destinationSelectView.setLabel(TypeLabel[key]);
    this.updateOfferSelectView();
  }

  onDestinationSelectChange() {
    this.updateDestinationDetailsView();
  }

  onPointEdit() {
    /** @type {PointView} */
    const editablePoint = document.querySelector(`#point-${this.model.editablePoint.id}`);

    this.view.close(true);

    this.updateTypeSelectView();
    this.updateDestinationSelectView();
    this.updateDatePickerView();
    this.updatePriceInputView();
    this.updateOfferSelectView();
    this.updateDestinationDetailsView();

    this.view
      .link(editablePoint)
      .open();
  }

  /**
   * @param {Event} event
   */
  async onPointEditorSubmit(event) {
    event.preventDefault();

    this.view.disableSaveButton();

    try {
      await this.model.points.update(this.model.editablePoint.id, this.getFormData());
      this.view.close();

    } catch (exception) {
      // TODO shake
    }

    this.view.enableSaveButton();
  }

  /**
   * DELETE
   * @param {Event} event
   */
  async onPointEditorReset(event) {
    event.preventDefault();

    this.view.disableDeleteButton();

    try {
      await this.model.points.remove(this.model.editablePoint.id);
      this.view.close();

    } catch (exception) {
      // TODO shake
    }

    this.view.enableDeleteButton();
  }
}
