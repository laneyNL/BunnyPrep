import ConnectingObject from "./connecting_object";
import Lesson from './lessons.js';

export default class Room {
  constructor(canvas, game) {
    this.room = canvas.getContext("2d");
    this.game = game;
    this.width = canvas.width;
    this.height = canvas.height;
    this.door = new ConnectingObject('door', 75, 225, 70, 130);
    this.couch1 = new ConnectingObject('couch', 490, 160, 140, 40,60);
    this.drawer = new ConnectingObject('drawer', 630, 215, 150, 75, 30);
    this.couch2 = new ConnectingObject('couch', 770, 300, 140, 40,60);
    this.litterBox = new ConnectingObject('litter box', 520, 520, 80, 110, 10);
    this.water = new ConnectingObject('water', 320, 250, 60, 40);
    this.foodBowl = new ConnectingObject('food-bowl', 230, 440, 30, 30, 5);
    this.furnishings = [this.door, this.drawer, this.litterBox, this.couch1, , this.couch2,this.water, this.foodBowl];
    this.loadDroppings();
  }

  // resizeRoomCanvas() {
  //   this.room = this.game.canvas.getContext("2d");
  //   this.width = this.game.canvas.width;
  //   this.height = this.game.canvas.height;
  // }
  
  drawConnection(x, y, width, height) {
    // this.room.fillStyle = 'blue';
    // this.room.fillRect(x, y, width, height);
  }

  drawRoom() {
    this.room.lineWidth = 4;
    this.room.strokeStyle = "black";
    this.drawBackground(this.width/2, 15, this.width/2, this.height/4, 'rgba(242, 236, 207, 0.8)');
    this.drawWindow(510, 40, 135, 100, 'white', 5);
    this.drawWindow(810, 190, 135, 100, 'white', 5);
    
    this.drawDoor(this.door.x, this.door.y, this.door.width, this.door.height);
    this.drawMat(270, 400, 80, 110, 'rgb(105, 157, 173)');
    this.drawMat(370, 250, 110, 80, 'rgb(105, 157, 173)');
    this.drawLitterBox(this.litterBox.x, this.litterBox.y, this.litterBox.width, this.litterBox.height, this.litterBox.length);
    
    this.drawFoodBowl(this.foodBowl.x, this.foodBowl.y, this.foodBowl.width, this.foodBowl.height, this.foodBowl.length);
    this.drawWater(this.water.x, this.water.y, this.water.width, this.water.height);
    this.drawArt(400, 100, 250, 100);
    
    this.drawPlant(350, 0, 220, 300);
    this.drawCouch(this.couch1.x-30, this.couch1.y+30, this.couch1.width, this.couch1.height, this.couch1.length);
    this.drawDrawer(this.drawer.x, this.drawer.y, this.drawer.width, this.drawer.height, this.drawer.length);
    this.drawTV(650, 110, 130, 100, 'gray', 4);
    this.drawCouch(this.couch2.x-30, this.couch2.y+30, this.couch2.width, this.couch2.height, this.couch2.length);
  }

  clearRoom() {
    this.room.clearRect(0,0,this.width, this.height);
  }
  
  drawBackground(x,y,width,height,color) {
    this.drawRect('right', x, y, width, height, color);
    this.drawRect('left', x, y, width, height, color);
    this.drawFloorRect(x, height+y, width, width, color);
  }

  drawWindow(x, y, width, height, color, length) {
    this.drawRightCuboid(x, y, width, height, color, length);
    let shape = () => { 
      this.drawRect('right', x+(length*2), y+(length*3), width*0.35, height*0.35, 'skyblue');
      this.drawRect('right', x+(length * 2), y + (width*0.45), width*0.35, height*0.35, 'skyblue');
    };
    this.repeatShape(2, width * 0.4, width * 0.2, shape);
  }

  drawDoor(x, y, width, height) {
    this.drawConnection(x, y, width, height);
    x = x + width;
    this.drawRect('left', x, y, width, height,'white');
    this.drawRect('left', x-(width*0.1), y+(height*0.1), width*0.8, height*0.9, "rgba(147, 96, 38, 0.8)");
    this.drawBorderedCircle(x-(20), y+(height*0.6),5,'yellow');
  }

  drawDrawer(x, y, width, height, length) {
    this.drawRightCuboid(x, y, width, height, "rgba(77, 67, 56)",length);
    let shape = () => {
      this.drawRect('right', x+(width * 0.1), y+(height*0.2),  width*0.8, height*0.3, 'white');
      this.drawRect('right',x+(width*0.4),y+(height*0.6), 10, 5, "rgba(77, 67, 56)");
    }
    this.repeatShape(2, 0, (height * 0.45), shape);
    this.drawConnection(x, y, width, height);
  }

  drawTV(x, y, width, height, color, length) {
    this.drawRightCuboid(x, y, width, height, color, length);
    this.drawRect('right', x + (width * 0.05), y + (height * 0.1), width*0.9, height* 0.8, 'skyblue');
    // const pano = document.getElementById('panorama');
    // this.room.drawImage(pano, x , y + (height * 0.4), width, height * 0.8);
  }

  drawMat(x, y, width, height, color) {
    this.drawFloorRect(x, y, width, height, color);
  }
  
  drawLitterBox(x, y, width, height, length) {
    this.drawConnection(x, y, width, height);
    this.drawFloorCuboid(x, y, width, height,'grey', length, 'grey');
  }

  drawFoodBowl(x, y, width, height, length) {
    this.drawConnection(x, y, width, height);
    this.drawFloorCuboid(x, y, width, height, 'grey', length, 'grey');
  }

  drawLeaf() {
    const leaf = document.getElementById('leaf');
    this.room.drawImage(leaf, this.foodBowl.x-10, this.foodBowl.y-10, this.foodBowl.width+10, this.foodBowl.height+10);
    this.room.drawImage(leaf, this.foodBowl.x-30, this.foodBowl.y-10, this.foodBowl.width+10, this.foodBowl.height+10);
    this.room.drawImage(leaf, this.foodBowl.x-30, this.foodBowl.y-20, this.foodBowl.width+10, this.foodBowl.height+10);
  }

  drawPlant(x,y,width,height) {
    const plant = document.getElementById('plant');
    this.room.drawImage(plant, x, y, width, height);
  }

  drawWater(x, y, width, height) {
    this.drawConnection(x, y, width, height);
    const waterBowl = document.getElementById('water-bowl');
    this.room.drawImage(waterBowl, x, y, width, height);
  }

  drawCouch(x, y, width, height, length) {
    width = width/2;
    let buttonPos = this.nextCornerPos(x, y, width / 2, 'SE');
    buttonPos = this.nextCornerPos(...buttonPos, length / 2, 'NE');
    
    let shape = () => {
      this.drawRightCuboid(x, y, width, height, 'rgb(170, 149, 172)', length);
      this.drawBorderedCircle(...buttonPos, 5, 'rgb(170, 149, 172)');
    }
    
    this.repeatShape(2, ...this.changeInXY(width), shape);
    this.drawConnection(x+30, y-30, width*2, height);
  }

  drawArt(x, y, width, height) {
    this.drawRect('left', x, y, width, height, "rgba(77, 67, 56)")
  }

  loadDroppings() {
    this.droppings = [];
    for (let i = 0; i < 5; i++) {
      let x = Math.floor((Math.random() * (this.game.canvas.width / 2))) + (this.game.canvas.width / 4);
      let y = Math.floor((Math.random() * (this.game.canvas.height / 4)) + this.game.canvas.height / 2);
      let drop = new ConnectingObject('dropping', x, y, 5, 5);
      this.droppings.push(drop);
    }
  }

  drawDroppings() {
    this.droppings.forEach(drop => {
      this.drawBorderedCircle(drop.x, drop.y, drop.width, '#6C4747');
    })
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
    this.drawRect('right',x, y, width, height, color); //front panel

    let topPanelPos = this.nextCornerPos(x+1,y-2,sideWidth, 'NE'); //top right of top panel
    this.drawFloorRect(topPanelPos[0], topPanelPos[1], width, sideWidth, color);

    let sidePanelPos = this.nextCornerPos(...topPanelPos,width,'SE'); //top right of side panel
    this.drawRect('left', sidePanelPos[0]+1, sidePanelPos[1]+2, sideWidth, height, color);

  }

  drawFloorCuboid(x,y,width,height,floorColor, sideHeight, sideColor) {
    this.drawFloorRect(x,y,width,height,floorColor);
    let leftSidePos = this.nextCornerPos(x,y,sideHeight,'up');
    this.drawRect('left', leftSidePos[0]-1, leftSidePos[1]-2, height, sideHeight, sideColor);
    this.drawRect('right', leftSidePos[0] + 1, leftSidePos[1] - 2,width,sideHeight,sideColor);

    let frontSidePos = this.nextCornerPos(...leftSidePos, height, 'SW');
    this.drawRect('right', frontSidePos[0]-1, frontSidePos[1]+1, width, sideHeight, sideColor);

    let rightSidePos = this.nextCornerPos(...leftSidePos, width, 'SE');
    this.drawRect('left', rightSidePos[0]+1, rightSidePos[1]+1, height, sideHeight, sideColor);

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