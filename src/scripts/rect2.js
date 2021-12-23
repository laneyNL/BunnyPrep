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
    // this.rightRectangle(350, 10, 175, 130, 'rgba(28, 154, 218, 0.23)');
    // this.leftRectangle(170, 185, 175, 130, 'rgba(28, 154, 218, 0.23)');
    // this.floorRectangle(350, 140, 250, 250,'rgba(28, 154, 218, 0.23)');


    this.rightRectangle(350, 15, 300, 150, 'rgba(28, 154, 218, 0.23)');
    this.leftRectangle(50, 165, 300, 150, 'rgba(28, 154, 218, 0.23)');
    this.floorRectangle(350, 165, 300, 300, 'rgba(28, 154, 218, 0.23)');

  }

  door() {
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
    // this.room.fillStyle="pink";
    // this.room.beginPath();
    // this.room.moveTo(375,420);
    // this.room.arc(375,350, 70, 0, Math.PI*2, true);
    // this.room.closePath();
    // this.room.stroke();
    // this.room.fill();
    this.floorRectangle(400, 300, 50, 80, 'pink');
  }

  rightRectangle(x1, y1, width, height, color) {
    this.room.fillStyle = color;
    this.room.beginPath();//slope ~ 1/2
    this.room.moveTo(x1, y1); //top left corner
    this.room.lineTo(x1 + width, y1 + (width / 2));
    this.room.lineTo(x1 + width, y1 + height + (width / 2));
    this.room.lineTo(x1, y1 + height);
    this.room.closePath();
    this.room.stroke();
    this.room.fill();

  }
  leftRectangle(x1, y1, width, height, color) {
    this.room.fillStyle = color;
    this.room.beginPath();//slope ~ 1/2
    this.room.moveTo(x1, y1); //top left corner
    this.room.lineTo(x1 + width, y1 - (width / 2));
    this.room.lineTo(x1 + width, y1 + height - (width / 2));
    this.room.lineTo(x1, y1 + height);
    this.room.closePath();
    this.room.stroke();
    this.room.fill();

  }
  floorRectangle(x1, y1, width, height, color) {
    this.room.fillStyle = color;
    this.room.beginPath();//slope ~ 1/2
    this.room.moveTo(x1, y1); //top corner
    this.room.lineTo(x1 + width, y1 + (width / 2));
    // let y2 = ((width ** 2) + (height ** 2)) ** 0.5;
    let y2 = ((width ^ 2) + (height ^ 2) - (2 * width * height * Math.cos(70 * (Math.PI / 180)))) ^ 0.5;
    this.room.lineTo(x1, y1 + y2);
    this.room.lineTo(x1 - height, y1 + (height / 2));
    this.room.closePath();
    this.room.stroke();
    this.room.fill();
  }

}