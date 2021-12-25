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
    // this.couch();
    this.window();
  }
  
  background() {
    this.room.fillStyle = "white";
    this.room.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.rectangle('right', 350, 15, 333, 150, 'rgba(242, 236, 207, 0.8)');
    this.rectangle('left', 350, 15, 333, 149, 'rgba(242, 236, 207, 0.8)');
    this.floorRectangle(350, 165, 370, 370, 'rgba(242, 236, 207, 0.8)');

  }
  
  window() {
    this.rightCuboid(500,110,135,100, 'white', 5);
    // this.rectangle('right',500,110, 135, 100, 'white');
    // this.floorRectangle(506,106,150,5,'white');
    // this.leftRectangle(643,176,5,99, 'white');
    // this.rectangle('right',510, 130, 30, 30, 'skyblue');
    // this.rectangle('right',550, 150, 30, 30, 'skyblue');
    // this.rectangle('right',590, 170, 30, 30, 'skyblue');
    // this.rectangle('right',510, 170, 30, 30, 'skyblue');
    // this.rectangle('right',550, 190, 30, 30, 'skyblue');
    // this.rectangle('right',590, 210, 30, 30, 'skyblue');
  }

  door() {
    this.rectangle('left',115,175,50,105,'white');
    this.rectangle('left',110, 185, 40, 100, "rgba(147, 96, 38, 0.8)");
    this.borderedCircle(100,240,5,'yellow');
  }

  drawer() {
    this.rightCuboid(330, 130, 110, 75, "rgba(77, 67, 56)",30);
    this.rectangle('right',344,152, 80, 20, 'white');
    this.rectangle('right',344,182, 80, 20, 'white');
    this.rectangle('right',375,175, 10, 5, "rgba(77, 67, 56)");
    this.rectangle('right',375,205, 10, 5, "rgba(77, 67, 56)");
  }

  tv() {
    this.rightCuboid(348,48,95,80,'gray',4);
    this.rectangle('right',358, 65, 70, 60, 'skyblue');
  }

  // rug() {
  //   this.borderedCircle(270,300,70,'red');
  // }

  mat() {
    this.floorRectangle(500,250,170,110,'pink');
  }
  
  box() {
    this.rectangle('left',565,280,70,10,'grey');
    this.rectangle('right',495,317, 70,10, 'grey');
    this.rectangle('left',635,317,70,10,'grey');
    this.floorRectangle(565,287,70,70,'lightyellow');
  }

  water() {
    this.borderedCircle(500,280,20,'grey');
    this.borderedCircle(500,280,15,'blue');
  }

  couch() {
    this.floorRectangle(170,300,125,30, 'lightyellow');
    this.rectangle('left',258,325,25,94, 'pink');
    this.floorRectangle(142,267,125,30, 'pink');
    this.rectangle('right',120, 280, 110, 100, 'pink');
    this.rectangle('left',300,348,40,50, 'pink');
  }

  borderedCircle(x,y, radius, color) {
    this.room.fillStyle = color;
    this.room.beginPath();
    this.room.moveTo(x,y);
    this.room.arc(x,y, radius, 0, Math.PI * 2, true);
    this.room.closePath();
    this.room.stroke();
    this.room.fill();
  }

  rectangle(type, x, y, width, height, color) {
    let direction = (type === 'right') ? 'SE' : 'SW';
    this.room.fillStyle = color;
    this.room.beginPath();//slope ~ 1/2
    this.room.moveTo(x, y); //top left corner

    let downPos = this.changedPos(x, y, height, 'down');
    this.room.lineTo(...downPos);
    this.room.lineTo(...this.changedPos(downPos[0], downPos[1], width, direction));
    this.room.lineTo(...this.changedPos(x, y, width, direction));

    this.room.closePath();
    this.room.stroke();
    this.room.fill();
  }

  
  floorRectangle(x1, y1, width, height, color) {
    this.room.fillStyle = color;
    this.room.beginPath();//slope ~ 1/2
    this.room.moveTo(x1, y1); //top corner

    let rightPos = this.changedPos(x1, y1, width, 'SE');
    this.room.lineTo(...rightPos);
    this.room.lineTo(...this.changedPos(rightPos[0], rightPos[1], height, 'SW'));
    this.room.lineTo(...this.changedPos(x1, y1, height, 'SW'));
    
    this.room.closePath();
    this.room.stroke();
    this.room.fill();
  }

  changedPos(x, y, length, direction) {
    let changeY = ((length ** 2) / 5) ** 0.5;
    let changeX = 2*changeY;
    switch(direction) {
      case 'NE':
        return [x + changeX, y - changeY];
      case 'SE':
        return [x + changeX, y + changeY];
      case 'SW':
        return [x - changeX, y + changeY];
      case 'NW':
        return [x - changeX, y - changeY];
      case 'down':
        return [x, y+length];
    }
  }

  rightCuboid(x,y,width,height,color, sideWidth){
    this.rectangle('right',x, y, width, height, color);

    let topPanelPos = this.changedPos(x,y,sideWidth, 'NE'); //top right of top panel
    this.floorRectangle(...topPanelPos, width, sideWidth, color);

    let sidePanelPos = this.changedPos(...topPanelPos,width,'SE'); //top right of side panel
    this.rectangle('left', ...sidePanelPos, sideWidth, height, color);

  }

}