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

    this.model.addEventListener('edit', this.onModelEdit.bind(this));

    this.view.addEventListener('submit', this.onViewSubmit.bind(this));
    this.view.addEventListener('reset', this.onViewReset.bind(this));
    this.view.addEventListener('close', this.onViewClose.bind(this));

    this.view.pointTypeSelectView.addEventListener('change', this.onViewPointTypeSelectChange.bind(this));
    this.view.destinationSelectView.addEventListener('change', this.onViewDestinationSelectChange.bind(this));
  }

  buildTypeSelectView() {
    /** @type {TypeOptionState[]} */
    const optionStates = Object.values(PointType).map((type) => {
      const key = PointType.findKey(type);
      const label = PointLabel[key];

      return [label, type];
    });

    this.view.pointTypeSelectView.setOptions(optionStates);
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

  buildOfferSelectView() {
    const selectedType = this.view.pointTypeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(selectedType).items;

    /** @type {OfferOptionState[]} */
    const optionStates = availableOffers.map((offer) => [offer.id, offer.title, offer.price]);

    this.view.offerSelectView
      .set('hidden', !availableOffers.length)
      .setOptions(optionStates);
  }

  updateTypeSelectView() {
    this.view.pointTypeSelectView.setValue(this.model.activePoint.type);
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
    const selectedType = this.view.pointTypeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(selectedType).items;

    const checkedOptions = availableOffers.map((offer) =>
      this.model.activePoint.offerIds.includes(offer.id)
    );

    this.view.offerSelectView.setCheckedOptions(checkedOptions);
  }

  updateDestinationView() {
    const selectedDestination = this.view.destinationSelectView.getDestination();
    const destination = this.model.destinations.findBy('name', selectedDestination);

    /** @type {DestinationPictureState[]} */
    const pictureStates = destination.pictures.map((picture) => [picture.src, picture.description]);

    this.view.destinationView
      .set('hidden', !destination)
      .setDescription(destination.description)
      .setPictures(pictureStates);
  }

  /** Получит данные с формы */
  getFormData() {
    const point = new PointAdapter();

    const destinationName = this.view.destinationSelectView.getDestination();
    const [startDate, endDate] = this.view.datePickerView.getDates();

    point.type = this.view.pointTypeSelectView.getValue();
    point.destinationId = this.model.destinations.findBy('name', destinationName)?.id;
    point.startDate = startDate;
    point.endDate = endDate;
    point.basePrice = Number(this.view.priceInputView.getPrice());
    point.offerIds = this.view.offerSelectView.getCheckedValues().map(Number);
    point.isFavorite = false;

    return point;
  }

  /** Обновит форму */
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
   * Обработает событие SAVE
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
   * Обработает событие DELETE
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

  /** Обработает событие CLOSE */
  onViewClose() {
    this.model.setMode(Mode.VIEW);
  }

  onViewPointTypeSelectChange() {
    const value = this.view.pointTypeSelectView.getValue();
    const key = PointType.findKey(value);

    this.view.destinationSelectView.setLabel(PointLabel[key]);
    this.buildOfferSelectView();
  }

  onViewDestinationSelectChange() {
    this.updateDestinationView();
  }
}
