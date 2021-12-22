const { ContextExclusionPlugin } = require("webpack");

export default class Room {
  constructor(canavs) {
    this.room = canvas.getContext('2d');
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.background();
  }
  
  background() {
    this.room.fillStyle = "white";
    this.room.fillRect(0, 0, 500, 500);
  }
  
}