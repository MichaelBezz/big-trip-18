import PointItemView, {html} from './point-item-view.js';

import PointTypeSelectView from './point-type-select-view.js';
import DestinationSelectView from './destination-select-view.js';
import DatePickerView from './date-picker-view.js';
import PriceInputView from './price-input-view.js';
import OfferSelectView from './offer-select-view.js';
import DestinationView from './destination-view.js';

/** Представление формы создания точки */
export default class PointCreatorView extends PointItemView {
  constructor() {
    super();

    /** @type {PointTypeSelectView} */
    this.pointTypeSelectView = this.querySelector(String(PointTypeSelectView));

    /** @type {DestinationSelectView} */
    this.destinationSelectView = this.querySelector(String(DestinationSelectView));

    /** @type {DatePickerView} */
    this.datePickerView = this.querySelector(String(DatePickerView));

    /** @type {PriceInputView} */
    this.priceInputView = this.querySelector(String(PriceInputView));

    /** @type {OfferSelectView} */
    this.offerSelectView = this.querySelector(String(OfferSelectView));

    /** @type {DestinationView} */
    this.destinationDetailsView = this.querySelector(String(DestinationView));
  }

  /** @override */
  createAdjacentHtml() {
    return html`
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          ${PointTypeSelectView}
          ${DestinationSelectView}
          ${DatePickerView}
          ${PriceInputView}
          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
          ${OfferSelectView}
          ${DestinationView}
        </section>
      </form>
    `;
  }
}

customElements.define(String(PointCreatorView), PointCreatorView);
