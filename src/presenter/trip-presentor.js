import { render, RenderPosition } from '../render.js';
import SortView from '../view/sort-view.js';
import TripListView from '../view/trip-list-view.js';
import TripItemView from '../view/trip-item-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventView from '../view/event-view.js';

export default class TripPresenter {
  tripList = new TripListView();
  tripItem = new TripItemView();

  init = (tripContainer) => {
    this.tripContainer = tripContainer;

    render(new SortView(), tripContainer);
    render(this.tripList, tripContainer);
    render(this.tripItem, this.tripList.getElement(), RenderPosition.AFTERBEGIN);
    render(new EventEditView(), this.tripItem.getElement());

    for (let i = 0; i < 3; i++) {
      const newItem = new TripItemView();
      render(new EventView(), newItem.getElement());
      render(newItem, this.tripList.getElement());
    }
  };
}
