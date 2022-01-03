import ConnectingObject from './connecting_object';

export default class Bunny extends ConnectingObject {
  
  constructor(name, color, canvas) {
    super(name, 200, 250);
    this.color = color;
    this.maxWidth = canvas.width;
    this.maxHeight = canvas.height;
    this.ctx = canvas.getContext("2d");
    this.happyMeter = 5;
    this.keys = {};
    this.canvas = canvas;
    this.loadBunny();
    this.hayPieces = [];
  }
  
  loadBunny() {
    this.bunnyImg = new Image();
    this.bunnyImg.src = `./images/${this.color}/${this.color}_${this.emotion()}.png`;
    this.bunnyImg.alt = `${this.emotion()} ${this.color} bunny`;
    this.bunnyImg.onload = () => {
      this.width = Math.floor(this.bunnyImg.width/8);
      this.height = Math.floor(this.bunnyImg.height/8);
      this.drawBunny.bind(this)();
      this.moveBunnyListener();
      this.displayBunnyInfo();
    }
  }

  drawBunny() {
    this.updatePosition();
    this.ctx.drawImage(this.bunnyImg, this.x, this.y, this.width, this.height);
  }

  emotion() {
    if (this.happyMeter < 3) return 'mad';
    if (this.happyMeter > 8) return 'happy';
    return 'sad';
  }
  
  changeHappiness(change=0) {
    this.happyMeter = (this.happyMeter + change) % 11;
    if (this.happyMeter < 0) this.happyMeter = 0;
  }

  displayBunnyInfo() {
    const bunnyName = document.getElementById('bunny-name');
    let nameText = document.createElement('p');
    nameText.innerHTML = `${this.name}`;
    bunnyName.appendChild(nameText);
    const bunnyDisplay = document.getElementById('bunny-display');
    
    for(let i = 0; i < 10; i++) {
      let heartType = (i < this.happyMeter) ? 'heart' : 'empty-heart';
      let heartImg = document.createElement('img');
      heartImg.src = `./images/${heartType}.png`;
      heartImg.alt = `${heartType}`;
      heartImg.width = '15';

      bunnyDisplay.appendChild(heartImg);
    }
  }

  moveBunnyListener() {
    window.addEventListener('keydown', (event) => {
      this.keys[event.keyCode] = true;
    })
    window.addEventListener('keyup', () => {
      this.keys[event.keyCode] = false;
    })
    
    window.addEventListener('mousedown', (event) => {
      let offset = this.canvas.getBoundingClientRect();
      this.x = event.pageX - offset.left - (this.width/2);
      this.y = event.pageY - offset.top - (this.height/2);
    })
  }

  updatePosition() {
    if (this.keys[37]) this.x -= 2; //37 = left arrow
    if (this.keys[38]) this.y -= 2; //38 = up arrow
    if (this.keys[39]) this.x += 2; //39 = right arrow
    if (this.keys[40]) this.y += 2; //40 = down arrow
    this.wrapXY();
  }

  wrapXY() {
    if (this.x + this.width >= this.maxWidth) this.x = this.maxWidth - this.width;
    if (this.y + this.height >= this.maxHeight) this.y = this.maxHeight - this.height;
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
  }
  
  loadHay() {
    const hay = new Image();
    // hay.src = `./images/hay.svg`;
    hay.src = `./images/heart.png`;
    hay.alt = `hay`;
    return hay;
  }

  drawHay() {
    let numHay = 10;
    let hay = new Image();
    hay.src = `./images/hay.svg`;
    hay.alt = `hay`;
    
    for (let i = 0; i < numHay; i++) {
      this.multiplyHay(hay, 10*i, [300+i,450+i+5]);
    }
  }
  
  multiplyHay(hay, degree, hayPos, i) {
    let newCenterPos = [hayPos[0] + (hay.width/16), hayPos[1] +(hay.height/16)]
    this.ctx.save();
    
    this.ctx.translate(...newCenterPos);
    this.ctx.rotate(degree * (Math.PI / 180));
    this.ctx.translate(-newCenterPos[0], -newCenterPos[1]);
    this.ctx.drawImage(hay, ...hayPos, hay.width / 8, hay.height / 8);
    this.ctx.restore();
  }
}