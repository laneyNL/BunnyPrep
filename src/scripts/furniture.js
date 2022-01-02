import ConnectingObject from './connecting_object';

export default class Furniture extends ConnectingObject {
  constructor(name, x, y, width, height, length) {
    super(name, x, y, width, height, length);
  }
}