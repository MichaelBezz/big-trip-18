import { generatePoint } from '../mock/trip-point-mock.js';

export default class TripPointModel {
  _points = Array.from({length: 3}, generatePoint);

  get points() {
    return this._points;
  }
}
