export default class ConnectingObject {
  constructor(name, x, y, width, height, length) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.length = length;
  }

  isCollidedWith(otherObj) {
    let isCollided = true;
    let rightX = this.x + this.width;
    let bottomY = this.y + this.height;


    // if() {
    //   isCollided = false;
    // }
    return isCollided;
  }
}