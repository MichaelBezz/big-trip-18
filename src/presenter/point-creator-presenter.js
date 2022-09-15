import Presenter from './presenter.js';
import PointAdapter from '../adapter/point-adapter.js';

import Mode from '../enum/mode.js';
import PointType from '../enum/point-type.js';
import PointLabel from '../enum/point-label.js';
import UnitFormat from '../enum/unit-format.js';

/**
 * Презентор формы создания
 * @template {ApplicationModel} Model
 * @template {PointCreatorView} View
 * @extends {Presenter<Model,View>}
 */
export default class PointCreatorPresenter extends Presenter {
  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.buildPointTypeSelectView();
    this.buildDestinationSelectView();
    this.buildDatePickerView();
    this.buildOfferSelectView();
    this.buildDestinationView();

    this.model.addEventListener('create', this.onModelCreate.bind(this));
    this.model.addEventListener('edit', this.onModelEdit.bind(this));

    this.view.addEventListener('submit', this.onViewSubmit.bind(this));
    this.view.addEventListener('reset', this.onViewReset.bind(this));
    this.view.addEventListener('close', this.onViewClose.bind(this));

    this.view.pointTypeSelectView.addEventListener('change', this.onViewPointTypeSelectChange.bind(this));
    this.view.destinationSelectView.addEventListener('change', this.onViewDestinationSelectChange.bind(this));
  }

  /** TypeSelect -> setOptions -> setValue (установит тип точки) */
  buildPointTypeSelectView() {
    /** @type {TypeOptionState[]} */
    const optionStates = Object.values(PointType).map((type) => {
      const key = PointType.findKey(type);
      const label = PointLabel[key];

      return [label, type];
    });

    this.view.pointTypeSelectView
      .setOptions(optionStates)
      .setValue(PointType.TAXI);
  }

  /** DestinationSelect -> setOptions -> setLabel (установит название типа точки) */
  buildDestinationSelectView() {
    const destinationNames = this.model.destinations
      .listAll()
      .map((destination) => destination.name);

    /** @type {DestinationOptionState[]} */
    const optionStates = [...new Set(destinationNames)].map((name) => ['', name]);

    this.view.destinationSelectView
      .setOptions(optionStates)
      .setLabel(PointType.TAXI);
  }

  /** DatePicker -> configure */
  buildDatePickerView() {
    const calendarOptions = {
      dateFormat: UnitFormat.DATE_WITH_TIME,
      locale: {firstDayOfWeek: 1}
    };

    this.view.datePickerView.configure(calendarOptions);
  }

  /** OfferSelect -> set(hidden) -> setOptions */
  buildOfferSelectView() {
    const selectedType = this.view.pointTypeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(selectedType).items;

    /** @type {OfferOptionState[]} */
    const optionStates = availableOffers.map((offer) => [offer.id, offer.title, offer.price]);

    this.view.offerSelectView
      .set('hidden', !availableOffers.length)
      .setOptions(optionStates);
  }

  /** Destination -> set(hidden) */
  buildDestinationView() {
    this.view.destinationView.set('hidden', true);
  }

  /** Destination -> set(hidden) -> setDescription -> setPictures */
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

  /** Соберет данные формы */
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

  /** Сбросит данные формы */
  resetFormData() {
    this.view.pointTypeSelectView.setValue(PointType.TAXI);
    this.view.destinationSelectView.setLabel(PointType.TAXI).setDestination('');
    this.view.datePickerView.setDate('');
    this.view.priceInputView.setPrice('');
    this.buildOfferSelectView();
    this.buildDestinationView();
  }

  /** Обработает событие CREATE */
  onModelCreate() {
    this.view.open();
  }

  /**
   * Обработает событие EDIT
   * Закроет creator-view, если модель в режиме edit
   */
  onModelEdit() {
    this.view.close(true);
  }

  /**
   * Обработает событие SUBMIT(button SAVE) -> MODEL.ADD
   * @param {Event} event
   */
  async onViewSubmit(event) {
    event.preventDefault();

    this.view.setSaveButtonPressed(true);

    try {
      await this.model.points.add(this.getFormData());
      this.view.close();

    } catch (exception) {
      this.view.shake();
    }

    this.view.setSaveButtonPressed(false);
  }

  /**
   * Обработает событие RESET(button CLOSE)
   * @param {Event} event
   */
  onViewReset(event) {
    event.preventDefault();

    this.view.close();
    this.resetFormData();
  }

  /** Обработает событие CLOSE */
  onViewClose() {
    this.model.setMode(Mode.VIEW);
  }

  /**
   * Обработает событие CHANGE на PointTypeSelect
   * Обновит название типа точки (перед пунктом назначения)
   * Перерисует доступные опции
   */
  onViewPointTypeSelectChange() {
    const selectedType = this.view.pointTypeSelectView.getValue();
    const key = PointType.findKey(selectedType);

    this.view.destinationSelectView.setLabel(PointLabel[key]);

    this.buildOfferSelectView();
  }

  /**
   * Обработает событие CHANGE на DestinationSelect
   * Перерисует блок с описанием и картинками пункта назначения
   */
  onViewDestinationSelectChange() {
    this.updateDestinationView();
  }
}
