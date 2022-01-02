export default class ConnectingObject {
  constructor(name, x, y, width, height, length) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.rightX = this.x + this.width;
    this.bottomY = this.y + this.height;
    this.length = length;
  }

  isCollidedWith(otherObj) {
    let isCollided = true;
    
    if (this.x > otherObj.rightX) isCollided = false;
    if (this.rightX < otherObj.x) isCollided = false;
    if (this.y > otherObj.bottomY) isCollided = false;
    if (this.bottomY < otherObj.Y) isCollided = false;

    return isCollided;
  }
}