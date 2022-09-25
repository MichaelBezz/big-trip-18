import {escape} from 'he';

import Presenter from './presenter.js';
import DatePickerView from '../view/date-picker-view.js';

import Mode from '../enum/mode.js';
import PointType from '../enum/point-type.js';
import PointLabel from '../enum/point-label.js';

DatePickerView.setDefaults({
  dateFormat: 'd/m/y H:i',
  enableTime: true,
  locale: {firstDayOfWeek: 1, 'time_24hr': true}
});

/**
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

    this.model.addEventListener('mode', this.onModelMode.bind(this));

    this.view.addEventListener('submit', this.onViewSubmit.bind(this));
    this.view.addEventListener('reset', this.onViewReset.bind(this));
    this.view.addEventListener('close', this.onViewClose.bind(this));

    this.view.pointTypeSelectView.addEventListener('change', this.onPointTypeSelectViewChange.bind(this));
    this.view.destinationSelectView.addEventListener('change', this.onDestinationSelectViewChange.bind(this));
  }

  get activePoint() {
    const point = this.model.activePoint;

    const destinationName = this.view.destinationSelectView.getDestination();
    const [startDate, endDate] = this.view.datePickerView.getDates();

    point.type = this.view.pointTypeSelectView.getValue();
    point.destinationId = this.model.destinationsModel.findBy('name', destinationName)?.id;
    point.startDate = startDate;
    point.endDate = endDate;
    point.basePrice = Number(this.view.priceInputView.getPrice());
    point.offerIds = this.view.offerSelectView.getCheckedValues();
    point.isFavorite = false;

    return point;
  }

  buildPointTypeSelectView() {
    /** @type {PointTypeOptionState[]} */
    const optionStates = Object.keys(PointType).map((key) => [
      PointLabel[key],
      PointType[key]
    ]);

    this.view.pointTypeSelectView.setOptions(optionStates);
  }

  buildDestinationSelectView() {
    /** @type {DestinationOptionState[]} */
    const optionStates = this.model.destinationsModel.listAll().map((destination) => [
      '',
      escape(destination.name)
    ]);

    this.view.destinationSelectView.setOptions(optionStates);
  }

  buildDatePickerView() {
    this.view.datePickerView.configure({
      onChange: [(dates) => {
        const [minDate] = dates;

        this.view.datePickerView.configure({}, {minDate});
      }]
    }, {
      onValueUpdate: [() => {
        const [startDate, endDate = startDate] = this.view.datePickerView.getDates();

        this.view.datePickerView.setDates(startDate, endDate, false);
      }]
    });
  }

  updatePointTypeSelectView() {
    this.view.pointTypeSelectView.setValue(this.model.activePoint.type);
  }

  updateDestinationSelectView() {
    const {type, destinationId} = this.model.activePoint;

    const destination = this.model.destinationsModel.findById(destinationId);

    this.view.destinationSelectView
      .setLabel(PointLabel[PointType.findKey(type)])
      .setDestination(destination.name);
  }

  updateDatePickerView() {
    const {startDate, endDate} = this.model.activePoint;

    this.view.datePickerView.setDates(startDate, endDate);
  }

  updatePriceInputView() {
    const {basePrice} = this.model.activePoint;

    this.view.priceInputView.setPrice(String(basePrice));
  }

  updateOfferSelectView(check = false) {
    const selectedPointType = this.view.pointTypeSelectView.getValue();
    const availableOffers = this.model.offerGroupsModel.findById(selectedPointType).items;

    /** @type {OfferOptionState[]} */
    const optionStates = availableOffers.map((offer) => [
      escape(offer.id),
      escape(offer.title),
      escape(String(offer.price)),
      check && this.model.activePoint.offerIds.includes(offer.id)
    ]);

    this.view.offerSelectView
      .display(Boolean(availableOffers.length))
      .setOptions(optionStates);
  }

  updateDestinationView() {
    const selectedDestination = this.view.destinationSelectView.getDestination();
    const destination = this.model.destinationsModel.findBy('name', selectedDestination);

    /** @type {DestinationPictureState[]} */
    const pictureStates = destination.pictures.map((picture) => [
      escape(picture.src),
      escape(picture.description)
    ]);

    this.view.destinationView
      .display(Boolean(destination))
      .setDescription(destination.description)
      .setPictures(pictureStates);
  }

  updateView() {
    this.updatePointTypeSelectView();
    this.updateDestinationSelectView();
    this.updateDatePickerView();
    this.updatePriceInputView();
    this.updateOfferSelectView(true);
    this.updateDestinationView();
  }

  saveActivePoint() {
    return this.model.pointsModel.add(this.activePoint);
  }

  onModelMode() {
    this.view.close(false);

    if (this.model.getMode() === Mode.CREATE) {
      this.updateView();
      this.view.open();
    }
  }

  /**
   * @param {Event} event
   */
  async onViewSubmit(event) {
    event.preventDefault();

    this.view.setSaving(true);

    try {
      await this.saveActivePoint();
      this.view.close();

    } catch (exception) {
      this.view.shake();
    }

    this.view.setSaving(false);
  }

  /**
   * @param {Event} event
   */
  onViewReset(event) {
    event.preventDefault();

    this.view.close();
  }

  onViewClose() {
    this.model.setMode(Mode.VIEW);
  }

  onPointTypeSelectViewChange() {
    const selectedPointType = this.view.pointTypeSelectView.getValue();
    const key = PointType.findKey(selectedPointType);

    this.view.destinationSelectView.setLabel(PointLabel[key]);
    this.updateOfferSelectView();
  }

  onDestinationSelectViewChange() {
    this.updateDestinationView();
  }
}
