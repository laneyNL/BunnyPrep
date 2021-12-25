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
    this.drawer();
    this.tv();
    // this.rug();
    this.mat();
    this.box();
    this.water();
    this.couch();
    this.window();
  }
  
  background() {
    this.room.fillStyle = "white";
    this.room.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.rightRectangle(350, 15, 333, 150, 'rgba(242, 236, 207, 0.8)');
    this.leftRectangle(350, 15, 333, 149, 'rgba(242, 236, 207, 0.8)');
    this.floorRectangle(350, 165, 370, 370, 'rgba(242, 236, 207, 0.8)');

  }
  
  window() {
    this.rightRectangle(500,110, 135, 100, 'white');
    this.floorRectangle(506,106,150,5,'white');
    this.leftRectangle(643,176,5,99, 'white');
    this.rightRectangle(510, 130, 30, 30, 'skyblue');
    this.rightRectangle(550, 150, 30, 30, 'skyblue');
    this.rightRectangle(590, 170, 30, 30, 'skyblue');
    this.rightRectangle(510, 170, 30, 30, 'skyblue');
    this.rightRectangle(550, 190, 30, 30, 'skyblue');
    this.rightRectangle(590, 210, 30, 30, 'skyblue');
  }

  door() {
    this.leftRectangle(115,175,50,105,'white');
    this.leftRectangle(110, 185, 40, 100, "rgba(147, 96, 38, 0.8)");
    this.room.fillStyle = 'yellow';
    this.room.beginPath();
    this.room.arc(100, 240, 5, 0, Math.PI*2, true);
    this.room.stroke();
    this.room.fill();
    this.room.closePath();
  }

  drawer() {
    this.rightRectangle(330, 130, 100, 75, "rgba(77, 67, 56)"); //drawer
    this.floorRectangle(359, 114, 110, 30, "rgba(77, 67, 56)");
    this.leftRectangle(459,166, 25, 75, "rgba(77, 67, 56)");
    this.rightRectangle(340,150, 80, 20, 'white');
    this.rightRectangle(340,180, 80, 20, 'white');
    this.rightRectangle(375,175, 10, 5, "rgba(77, 67, 56)");
    this.rightRectangle(375,205, 10, 5, "rgba(77, 67, 56)");
  }
  tv() {
    this.rightRectangle(350, 60, 80, 70, 'gray') //tv
    this.leftRectangle(438,98,5,70);
    this.floorRectangle(357,57,87,5);
    this.rightRectangle(360, 70, 60, 60, 'skyblue')
  }

  // rug() {
  //   this.circleBorder(270,300,70,'red');
  // }

  mat() {
    this.floorRectangle(500,250,170,110,'pink');
  }
  
  box() {
    this.leftRectangle(565,280,70,10,'grey');
    this.rightRectangle(495,317, 70,10, 'grey');
    this.leftRectangle(635,317,70,10,'grey');
    this.floorRectangle(565,287,70,70,'lightyellow');
  }

  water() {
    this.circleBorder(500,280,20,'grey');
    this.circleBorder(500,280,15,'blue');
  }

  couch() {
    this.floorRectangle(170,300,125,30, 'lightyellow');
    this.leftRectangle(258,325,25,94, 'pink');
    this.floorRectangle(142,267,125,30, 'pink');
    this.rightRectangle(120, 280, 110, 100, 'pink');
    this.leftRectangle(300,348,40,50, 'pink');
  }

  circleBorder(x,y, radius, color) {
    this.room.fillStyle = color;
    this.room.beginPath();
    this.room.moveTo(x,y);
    this.room.arc(x,y, radius, 0, Math.PI * 2, true);
    this.room.closePath();
    this.room.stroke();
    this.room.fill();
  }

  rightRectangle(x1,y1, width, height, color) {
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
    this.room.moveTo(x1, y1); //top right corner
    this.room.lineTo(x1, y1 + height);
    this.room.lineTo(x1 - width, y1 + height + (width / 2));

    this.room.lineTo(x1 - width, y1 + (width / 2));

    this.room.closePath();
    this.room.stroke();
    this.room.fill();

  }
  floorRectangle(x1, y1, width, height, color) {
    this.room.fillStyle = color;
    this.room.beginPath();//slope ~ 1/2
    this.room.moveTo(x1, y1); //top corner

    let yHeight = ((height**2)/5)**0.5;
    let yWidth = ((width ** 2) / 5) ** 0.5;
    this.room.lineTo(x1 + (2*yWidth), y1 + yWidth);
    this.room.lineTo(x1 + (2*yWidth) - (2*yHeight), y1 + yWidth + yHeight);
    this.room.lineTo(x1 - (2*yHeight), y1 + yHeight);
    
    this.room.closePath();
    this.room.stroke();
    this.room.fill();
  }

  rightCuboid(x,y,width,height,color){
    this.rightRectangle(x, y, width, height, color);
    this.floorRectangle(359, 114, 110, 30, "rgba(77, 67, 56)");
    this.leftRectangle(459, 166, 25, 75, "rgba(77, 67, 56)");
  }

}