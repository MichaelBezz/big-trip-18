import Presenter from './presenter.js';
import PointAdapter from '../adapter/point-adapter.js';

import Mode from '../enum/mode.js';
import PointType from '../enum/point-type.js';
import PointLabel from '../enum/point-label.js';

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
    const optionStates = Object.values(PointType).map((type) => {
      const key = PointType.findKey(type);
      const label = PointLabel[key];

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
    this.view.typeSelectView.setValue(this.model.activePoint.type);
  }

  updateDestinationSelectView() {
    const {type, destinationId} = this.model.activePoint;

    const destination = this.model.destinations.findById(destinationId);

    this.view.destinationSelectView
      .setLabel(type)
      .setDestination(destination.name);
  }

  updateDatePickerView() {
    const {startDate, endDate} = this.model.activePoint;

    this.view.datePickerView.setDate(startDate, endDate);
  }

  updatePriceInputView() {
    const {basePrice} = this.model.activePoint;

    this.view.priceInputView.setPrice(String(basePrice));
  }

  updateOfferSelectView() {
    const selectedType = this.view.typeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(selectedType).items;

    /** @type {OfferOptionState[]} */
    const optionStates = availableOffers.map((offer) => {
      const {id, title, price} = offer;
      const isChecked = this.model.activePoint.offerIds.includes(id);

      return [id, title, price, isChecked];
    });

    this.view.offerSelectView
      .set('hidden', !availableOffers.length)
      .setOptions(optionStates);
  }

  updateDestinationDetailsView() {
    const selectedDestinationName = this.view.destinationSelectView.getDestination();
    const destination = this.model.destinations.findBy('name', selectedDestinationName);

    /** @type {DestinationPictureState[]} */
    const pictureStates = destination.pictures.map((picture) => [picture.src, picture.description]);

    this.view.destinationView
      .set('hidden', !destination)
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
    const key = PointType.findKey(value);

    this.view.destinationSelectView.setLabel(PointLabel[key]);
    this.updateOfferSelectView();
  }

  onDestinationSelectChange() {
    this.updateDestinationDetailsView();
  }

  onPointEdit() {
    /** @type {PointView} */
    const activePoint = document.querySelector(`#point-${this.model.activePoint.id}`);

    this.view.close(true);

    this.updateTypeSelectView();
    this.updateDestinationSelectView();
    this.updateDatePickerView();
    this.updatePriceInputView();
    this.updateOfferSelectView();
    this.updateDestinationDetailsView();

    this.view
      .target(activePoint)
      .open();
  }

  /**
   * @param {Event} event
   */
  async onPointEditorSubmit(event) {
    event.preventDefault();

    this.view.disableSaveButton();

    try {
      await this.model.points.update(this.model.activePoint.id, this.getFormData());
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
      await this.model.points.remove(this.model.activePoint.id);
      this.view.close();

    } catch (exception) {
      // TODO shake
    }

    this.view.enableDeleteButton();
  }
}
