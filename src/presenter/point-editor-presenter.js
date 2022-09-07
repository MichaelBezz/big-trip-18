import Presenter from './presenter.js';

import Type from '../enum/type.js';
import TypeLabel from '../enum/type-label.js';
import {formatDateWithTime, formatNumber} from '../utils.js';

/**
 * Презентор формы редактирования
 * @template {ApplicationModel} Model
 * @template {PointEditorView} View
 * @extends Presenter<Model,View>
 */
export default class PointEditorPresenter extends Presenter {
  /** @type {PointAdapter}*/
  #point;

  /**
   * @param {[model: Model, view: View]} init
   */
  constructor(...init) {
    super(...init);

    this.buildTypeSelectView();
    this.buildDestinationSelectView();

    document.addEventListener('point-edit', this.onPointEdit.bind(this));
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

    this.view.typeSelectView
      .setOptions(optionStates);
  }

  buildDestinationSelectView() {
    const destinationNames = this.model.destinations
      .listAll()
      .map((destination) => destination.name);

    /** @type {DestinationOptionState[]} */
    const optionStates = [...new Set(destinationNames)].map((name) => ['', name]);

    this.view.destinationSelectView
      .setOptions(optionStates);
  }

  updateTypeSelectView() {
    this.view.typeSelectView.setValue(this.#point.type);
  }

  updateDestinationSelectView() {
    const destination = this.model.destinations.findById(this.#point.destinationId);

    this.view.destinationSelectView
      .setLabel(this.#point.type)
      .setValue(destination.name);
  }

  updateDatePickerView() {
    this.view.datePickerView
      .setStartTime(formatDateWithTime(this.#point.startDate))
      .setEndTime(formatDateWithTime(this.#point.endDate));
  }

  updatePriceInputView() {
    this.view.priceInputView.setPrice(formatNumber(this.#point.basePrice));
  }

  updateOfferSelectView() {
    const selectedType = this.view.typeSelectView.getValue();
    const availableOffers = this.model.offerGroups.findById(selectedType).items;

    /** @type {OfferOptionState[]} */
    const optionStates = availableOffers.map((offer) => {
      const {id, title, price} = offer;
      const isChecked = this.#point.offerIds.includes(id);

      return [id, title, price, isChecked];
    });

    this.view.offerSelectView
      .setOptions(optionStates);
  }

  updateDestinationDetailsView() {
    const selectedDestinationName = this.view.destinationSelectView.getValue();
    const destination = this.model.destinations.findBy('name', selectedDestinationName);

    /** @type {DestinationPictureState[]} */
    const pictureStates = destination.pictures.map((picture) => [picture.src, picture.description]);

    this.view.destinationDetailsView
      .setDescription(destination.description)
      .setPictures(pictureStates);
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

  /**
   * @param {CustomEvent & {target: PointView, detail: number}} event
   */
  onPointEdit(event) {
    this.#point = this.model.points.findById(event.detail);

    this.view.close();

    this.updateTypeSelectView();
    this.updateDestinationSelectView();
    this.updateDatePickerView();
    this.updatePriceInputView();
    this.updateOfferSelectView();
    this.updateDestinationDetailsView();

    this.view
      .link(event.target)
      .open();
  }
}
