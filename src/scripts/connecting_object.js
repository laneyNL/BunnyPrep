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
    let rightx = this.x + this.width;
    let bottomy = this.y + this.height;
    let otherBottomy = otherObj.y + otherObj.height;
    let otherRightx = otherObj.x + otherObj.width;

    if (this.x > otherRightx) isCollided = false;
    if (rightx < otherObj.x) isCollided = false;
    if (this.y > otherBottomy) isCollided = false;
    if (bottomy< otherObj.y) isCollided = false;

    return isCollided;
  }
}