import Adapter from './adapter.js';

export default class DestinationAdapter extends Adapter {
  /**
   * @param {Destination} destination
   */
  constructor(destination) {
    super();

    this.id = destination.id;
    this.name = destination.name;
    this.description = destination.description;
    this.pictures = destination.pictures.map((picture) => ({...picture}));
  }
}
