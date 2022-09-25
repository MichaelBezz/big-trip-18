import RadioGroupView, {html} from './radio-group-view.js';

import KeyboardCommand from '../enum/keyboard-command.js';

export default class PointTypeSelectView extends RadioGroupView {
  constructor() {
    super();

    /** @type {HTMLInputElement} */
    this.toggleView = this.querySelector('.event__type-toggle');

    this.classList.add('event__type-wrapper');

    this.addEventListener('click', this.onClick);
    this.addEventListener('change', this.onChange);
    this.addEventListener('focus', this.onFocus, true);
    this.addEventListener('blur', this.onBlur, true);
    this.addEventListener('keydown', this.onKeydown);
    this.addEventListener('pointerdown', this.onPointerdown);
  }

  /**
   * @override
   */
  createAdjacentHtml() {
    return html`
      <label class="event__type  event__type-btn" for="event-type-toggle-1" tabindex="0">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox" tabindex="-1">
      <div class="event__type-list">
        <fieldset class="event__type-group">
          <legend class="visually-hidden">Event type</legend>
          <!-- Options -->
        </fieldset>
      </div>
    `;
  }

  /**
   * @override
   * @param {number} index
   */
  setIndex(index) {
    super.setIndex(index);

    this.setIcon(this.getValue());

    return this;
  }

  /**
   * @override
   * @param {string} value
   */
  setValue(value) {
    super.setValue(value);

    this.setIcon(value);

    return this;
  }

  /**
   * @param  {PointTypeOptionState} state
   */
  createOptionHtml(...state) {
    const [label, value] = state;

    return html`
      <div class="event__type-item">
        <input
          id="event-type-${value}"
          class="event__type-input  visually-hidden"
          type="radio"
          name="event-type"
          value="${value}"
          tabindex="-1"
        >
        <label
          class="event__type-label  event__type-label--${value}"
          for="event-type-${value}"
        >
          ${label}
        </label>
      </div>
    `;
  }

  /**
   * @param {PointTypeOptionState[]} states
   */
  setOptions(states) {
    this.querySelector('.event__type-group').insertAdjacentHTML('beforeend', html`${
      states.map((state) => this.createOptionHtml(...state))
    }`);

    return this;
  }

  /**
   * @param {string} value
   */
  setIcon(value) {
    this.querySelector('img').src = `img/icons/${value}.png`;

    return this;
  }

  /**
   * @param {Event & {target: HTMLInputElement}} event
   */
  onClick(event) {
    if ([...this.inputViews].includes(event.target)) {
      this.setIcon(event.target.value);
      this.toggleView.checked = false;
    }
  }

  /**
   * @param {Event & {target: HTMLInputElement}} event
   */
  onChange(event) {
    if (event.target === this.toggleView) {
      event.stopImmediatePropagation();
    }
  }

  /**
   * @param {FocusEvent} event
   */
  onFocus(event) {
    if (event.target === this.toggleView.labels[0]) {
      this.toggleView.checked = true;
    }
  }

  /**
   * @param {FocusEvent & {relatedTarget: Element}} event
   */
  onBlur(event) {
    if (!this.contains(event.relatedTarget)) {
      this.toggleView.checked = false;
    }
  }

  /**
   * @param {KeyboardEvent} event
   */
  onKeydown(event) {
    if (KeyboardCommand.NEXT.includes(event.key)) {
      event.preventDefault();

      this.setIndex(this.getIndex() + 1);

      return;
    }

    if (KeyboardCommand.PREVIOUS.includes(event.key)) {
      event.preventDefault();

      this.setIndex(this.getIndex() - 1);

      return;
    }

    if (KeyboardCommand.EXIT.includes(event.key) && this.toggleView.checked) {
      event.stopPropagation();

      this.toggleView.checked = false;

      return;
    }

    if (KeyboardCommand.CONFIRM.includes(event.key) && this.toggleView.checked) {
      event.preventDefault();

      this.toggleView.checked = false;
    }
  }

  /**
   * @param {PointerEvent} event
   */
  onPointerdown(event) {
    event.preventDefault();
  }
}

customElements.define(String(PointTypeSelectView), PointTypeSelectView);
