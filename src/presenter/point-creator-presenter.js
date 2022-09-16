import Presenter from './presenter.js';

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

    this.model.addEventListener('create', this.onModelCreate.bind(this));
    this.model.addEventListener('edit', this.onModelEdit.bind(this));

    this.view.addEventListener('submit', this.onViewSubmit.bind(this));
    this.view.addEventListener('reset', this.onViewReset.bind(this));
    this.view.addEventListener('close', this.onViewClose.bind(this));

    this.view.pointTypeSelectView.addEventListener('change', this.onViewPointTypeSelectChange.bind(this));
    this.view.destinationSelectView.addEventListener('change', this.onViewDestinationSelectChange.bind(this));
  }

  /** TypeSelect -> setOptions */
  buildPointTypeSelectView() {
    /** @type {PointTypeOptionState[]} */
    const optionStates = Object.keys(PointType).map((key) => [PointLabel[key], PointType[key]]);

    this.view.pointTypeSelectView.setOptions(optionStates);
  }

  /** DestinationSelect -> setOptions */
  buildDestinationSelectView() {
    /** @type {DestinationOptionState[]} */
    const optionStates = this.model.destinations.listAll().map((destination) => ['', destination.name]);

    this.view.destinationSelectView.setOptions(optionStates);
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
    const selectedPointType = this.view.pointTypeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(selectedPointType).items;

    /** @type {OfferOptionState[]} */
    const optionStates = availableOffers.map((offer) => [offer.id, offer.title, offer.price]);

    this.view.offerSelectView
      .set('hidden', !availableOffers.length)
      .setOptions(optionStates);
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
      .setLabel(PointLabel[PointType.findKey(type)])
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
    const selectedPointType = this.view.pointTypeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(selectedPointType).items;

    const checkedOptions = availableOffers.map((offer) =>
      this.model.activePoint.offerIds.includes(offer.id)
    );

    this.view.offerSelectView.setCheckedOptions(checkedOptions);
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

  updateView() {
    this.updateTypeSelectView();
    this.updateDestinationSelectView();
    this.updateDatePickerView();
    this.updatePriceInputView();
    this.buildOfferSelectView();
    this.updateOfferSelectView();
    this.updateDestinationView();
  }

  /** Соберет данные с формы в PointAdapter */
  get activePoint() {
    const point = this.model.activePoint;

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

  /** Добавит activePoint в модель */
  saveActivePoint() {
    return this.model.points.add(this.activePoint);
  }

  /** Обработает событие CREATE */
  onModelCreate() {
    this.updateView();
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
   * Обработает событие SUBMIT(button SAVE)
   * @param {Event} event
   */
  async onViewSubmit(event) {
    event.preventDefault();

    this.view.setSaveButtonPressed(true);

    try {
      await this.saveActivePoint();
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
    const selectedPointType = this.view.pointTypeSelectView.getValue();
    const key = PointType.findKey(selectedPointType);

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
