export default class Room {
  constructor(ctx) {
    this.room = ctx;
    this.drawRoom();
  }

  drawRoom() {
    this.room.lineWidth = 4;
    this.room.strokeStyle = "black";
    this.drawBackground();
    this.drawDoor();
    this.drawDrawer();
    this.drawTV();
    // this.drawRug();
    this.drawMat();
    this.drawBox();
    this.drawWater();
    this.drawCouch(115, 330, 70, 40, 60);
    this.drawWindow();
  }
  
  drawBackground() {
    this.drawRect('right', 350, 15, 370, 150, 'rgba(242, 236, 207, 0.8)');
    this.drawRect('left', 350, 15, 370, 150, 'rgba(242, 236, 207, 0.8)');
    this.drawFloorRect(350, 165, 370, 370, 'rgba(242, 236, 207, 0.8)');

  }
  
  drawWindow() {
    this.drawRightCuboid(500,110,135,100, 'white', 5);
    let shape = () => { 
      this.drawRect('right', 510, 130, 50, 30, 'skyblue');
      this.drawRect('right', 510, 170, 50, 30, 'skyblue');
    };
    this.repeatShape(2, 56, 28, shape);
  }

  drawDoor() {
    this.drawRect('left',115,175,50,105,'white');
    this.drawRect('left',110, 185, 40, 100, "rgba(147, 96, 38, 0.8)");
    this.drawBorderedCircle(100,240,5,'yellow');
  }

  drawDrawer() {
    this.drawRightCuboid(330, 130, 110, 75, "rgba(77, 67, 56)",30);
    let shape = () => {
      this.drawRect('right',344,152, 80, 20, 'white');
      this.drawRect('right',375,175, 10, 5, "rgba(77, 67, 56)");
    }
    this.repeatShape(2, 0, 30, shape);
  }

  drawTV() {
    this.drawRightCuboid(348,48,95,80,'gray',4);
    this.drawRect('right',358, 65, 70, 60, 'skyblue');
  }

  // drawRug() {
  //   this.drawBorderedCircle(270,300,70,'red');
  // }

  drawMat() {
    this.drawFloorRect(500,250,170,110,'pink');
  }
  
  drawBox() {
    this.drawFloorCuboid(565,287,70,70,'lightyellow', 10, 'grey');
  }

  drawWater() {
    this.drawBorderedCircle(500,280,20,'grey');
    this.drawBorderedCircle(500,280,15,'blue');
  }

  drawCouch(x, y, width, height, length) {
    let buttonPos = this.nextCornerPos(x, y, width / 2, 'SE');
    buttonPos = this.nextCornerPos(...buttonPos, length / 2, 'NE');

    let shape = () => {
      this.drawRightCuboid(x, y, width, height, 'pink', length);
      this.drawBorderedCircle(...buttonPos, 5, 'pink');
    }
    
    this.repeatShape(2, ...this.changeInXY(width), shape);
  }

  drawBorderedCircle(x,y, radius, color) {
    this.room.fillStyle = color;
    this.room.beginPath();
    this.room.moveTo(x,y);
    this.room.arc(x,y, radius, 0, Math.PI * 2, true);
    this.room.closePath();
    this.room.stroke();
    this.room.fill();
  }

  drawRect(type, x, y, width, height, color) {
    let direction = (type === 'right') ? 'SE' : 'SW';
    this.room.fillStyle = color;
    this.room.beginPath();//slope ~ 1/2
    this.room.moveTo(x, y); //top left corner

    let downPos = this.nextCornerPos(x, y, height, 'down');
    this.room.lineTo(...downPos);
    this.room.lineTo(...this.nextCornerPos(downPos[0], downPos[1], width, direction));
    this.room.lineTo(...this.nextCornerPos(x, y, width, direction));

    this.room.closePath();
    this.room.stroke();
    this.room.fill();
  }

  
  drawFloorRect(x, y, width, height, color) {
    this.room.fillStyle = color;
    this.room.beginPath();//slope ~ 1/2
    this.room.moveTo(x, y); //top corner

    let rightPos = this.nextCornerPos(x, y, width, 'SE');
    this.room.lineTo(...rightPos);
    this.room.lineTo(...this.nextCornerPos(rightPos[0], rightPos[1], height, 'SW'));
    this.room.lineTo(...this.nextCornerPos(x, y, height, 'SW'));
    
    this.room.closePath();
    this.room.stroke();
    this.room.fill();
  }

  changeInXY(length) {
    let changeY = ((length ** 2) / 5) ** 0.5;
    let changeX = 2 * changeY;
    return [changeX, changeY];
  }

  nextCornerPos(x, y, length, direction) {
    let [changeX, changeY] = this.changeInXY(length);
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
        return [x, y + length];
      case 'up':
        return [x, y - length];
    }
  }

  drawRightCuboid(x,y,width,height,color, sideWidth){
    this.drawRect('right',x -2, y +2, width, height, color);

    let topPanelPos = this.nextCornerPos(x,y,sideWidth, 'NE'); //top right of top panel
    this.drawFloorRect(topPanelPos[0] - 2, topPanelPos[1], width, sideWidth, color);

    let sidePanelPos = this.nextCornerPos(...topPanelPos,width,'SE'); //top right of side panel
    this.drawRect('left', sidePanelPos[0] + 1, sidePanelPos[1] + 1, sideWidth, height, color);

  }

  drawFloorCuboid(x,y,width,height,floorColor, sideHeight, sideColor) {
    this.drawFloorRect(x,y,width,height,floorColor);
    let leftSidePos = this.nextCornerPos(x,y,sideHeight,'up');
    this.drawRect('left', ...leftSidePos, height, sideHeight, sideColor);
    this.drawRect('right', ...leftSidePos,width,sideHeight,sideColor);

    let frontSidePos = this.nextCornerPos(...leftSidePos, height, 'SW');
    this.drawRect('right',...frontSidePos, width, sideHeight, sideColor);

    let rightSidePos = this.nextCornerPos(...leftSidePos, width, 'SE');
    this.drawRect('left', ...rightSidePos, width, sideHeight, sideColor);

  }

  repeatShape( times, changeX, changeY, shape) {
    this.room.save();
    for (let i = 0; i < times; i++) {
      this.room.translate(i*changeX, i*changeY);
      shape();
    }
    this.room.restore();
  }

}