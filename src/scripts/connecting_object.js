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
    // if (this.x > otherObj.rightx) isCollided = false;
    // if (this.rightx < otherObj.x) isCollided = false;
    // if (this.y > otherObj.bottomy) isCollided = false;
    // if (this.bottomy < otherObj.y) isCollided = false;

    if (this.x > otherRightx) {
      isCollided = false
    } else if (rightx < otherObj.x) {
      isCollided = false
    } else if (this.y > otherBottomy) {
      isCollided = false
    } else if (bottomy< otherObj.y) {
      isCollided = false
    };

    return isCollided;
  }
}