export default class Room {
  constructor(canvas) {
    this.room = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.drawroom();
  }

  drawroom() {
    this.room.lineWidth = 4;
    this.room.strokeStyle = "black";
    this.background();
    this.door();
    this.tv();
    this.rug();
  }

  background() {
    this.room.fillStyle = "#C6C0C0";
    this.room.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.room.fillStyle = 'rgba(28, 154, 218, 0.23)';
    this.room.beginPath();
    this.room.moveTo(350, 15); //top corner
    this.room.lineTo(350, 215);
    this.room.lineTo(650, 360); //bottom right
    this.room.lineTo(350, 495);
    this.room.lineTo(50, 360); //bottom left
    this.room.lineTo(50, 150); // top left
    this.room.lineTo(350, 15);
    this.room.lineTo(650, 150); //top right
    this.room.lineTo(650, 360); //bottom right
    this.room.lineTo(350, 215);
    this.room.lineTo(350, 215);
    this.room.lineTo(50, 360); //bottom left
    this.room.stroke();
    this.room.fill();
    this.room.closePath();

    // this.room.fillStyle = "#C6C0C0";
    // this.room.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    // this.rightRectangle(350, 15, 250, 150, 'rgba(28, 154, 218, 0.23)');
    // this.leftRectangle(50, 165, 300, 150, 'rgba(28, 154, 218, 0.23)');
    // this.floorRectangle(350, 165, 250, 300, 'rgba(28, 154, 218, 0.23)');

  }

  door() {
    // this.room.fillStyle = 'pink';
    // this.room.beginPath();
    // this.room.moveTo(60,355);
    // this.room.lineTo(60, 250);
    // this.room.lineTo(100,230);
    // this.room.lineTo(100, 335);
    // this.room.stroke();
    // this.room.fill();
    this.leftRectangle(60, 250, 40, 100, 'pink');
    this.room.fillStyle = 'yellow';
    this.room.beginPath();
    this.room.arc(70, 300, 5, 0, Math.PI * 2, true);
    this.room.stroke();
    this.room.fill();
    this.room.closePath();
  }

  tv() {
    this.rightRectangle(370, 150, 100, 75, 'pink')
    this.rightRectangle(380, 85, 80, 70, 'gray')
    this.rightRectangle(390, 95, 60, 60, 'skyblue')

  }

  rug() {
    // this.floorRectangle(550, 310, 50, 70, 'red';
    this.room.fillStyle = "pink";
    this.room.beginPath();
    this.room.moveTo(375, 420);
    this.room.arc(375, 350, 70, 0, Math.PI * 2, true);
    this.room.closePath();
    this.room.stroke();
    this.room.fill();
  }

  rightRectangle(x1, y1, width, length, color) {
    this.room.fillStyle = color;
    this.room.beginPath();//slope ~ 1/2
    this.room.moveTo(x1, y1); //top left corner
    this.room.lineTo(x1 + width, y1 + (width / 2));
    this.room.lineTo(x1 + width, y1 + length + (width / 2));
    this.room.lineTo(x1, y1 + length);
    this.room.closePath();
    this.room.stroke();
    this.room.fill();

  }
  leftRectangle(x1, y1, width, length, color) {
    this.room.fillStyle = color;
    this.room.beginPath();//slope ~ 1/2
    this.room.moveTo(x1, y1); //top left corner
    this.room.lineTo(x1 + width, y1 - (width / 2));
    this.room.lineTo(x1 + width, y1 + length - (width / 2));
    this.room.lineTo(x1, y1 + length);
    this.room.closePath();
    this.room.stroke();
    this.room.fill();

  }
  floorRectangle(x1, y1, width, length, color) {
    this.room.fillStyle = color;
    this.room.beginPath();//slope ~ 1/2
    this.room.moveTo(x1, y1); //top left corner
    this.room.lineTo(x1 + width, y1 + (width / 2));
    this.room.lineTo(x1 - (length / 4), y1 + (length));
    this.room.lineTo(x1 - (length), y1 + length / 2);
    this.room.closePath();
    this.room.stroke();
    this.room.fill();
  }
}