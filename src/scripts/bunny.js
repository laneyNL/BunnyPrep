import ConnectingObject from './connecting_object';

export default class Bunny extends ConnectingObject {
  
  constructor(name, color, canvas, game, isFriend, mainBunny, x, y) {
    super(name, x, y);
    this.color = color;
    this.maxWidth = canvas.width;
    this.maxHeight = canvas.height;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.game = game;
    this.happyMeter = 5;
    this.keys = {};
    this.vel = [-2, 2]
    this.newPos = [];
    this.isFriend = isFriend;
    this.isFriend ? this.loadFriend() : this.loadBunny();
    this.hayPieces = 20;
    this.mainBunny = mainBunny;
  }

  loadBunny() {
    this.loadHay();
    this.bunnyImg = document.getElementById(`${this.color}-${this.emotion()}`);
    this.width = this.bunnyImg.width/8;
    this.height = this.bunnyImg.height/8;
    this.drawBunny.bind(this)();
    
    this.moveBunnyListener();
    this.displayBunnyInfo();
    this.hopVel = 4;
    this.isHopping = true;
    this.resetisHopping();
  }

  drawBunny() {
    let orientation = this.vel[0] > 0 ? '-reverse' : '';
    this.bunnyImg = document.getElementById(`${this.color}-${this.emotion()}${orientation}`);

    this.updatePosition();
    this.ctx.drawImage(this.bunnyImg, this.x, this.y, this.width, this.height);
    this.multiplyHay();
    this.displayBunnyInfo();
    this.drawBunnyInfo();
  }

  drawBunnyInfo() {
    this.ctx.fillStyle = 'black';
    this.ctx.font = '30px sans-serif';
    let text = `Budget: ${this.game.budget}`
    this.ctx.fillText(text, this.canvas.width*0.7, 50);

    for (let i = 0; i < 10; i++) {
      let heartType = (i < this.happyMeter) ? 'heart' : 'empty-heart';
      let heartImg = document.getElementById(heartType);
      let width = 30;
      this.ctx.drawImage(heartImg, 15 + (i*width), 30, width, width*1);
    }
  }

  emotion() {
    if (this.happyMeter < 2) return 'mad';
    if (this.happyMeter > 4) return 'happy';
    return 'sad';
  }
  
  changeHappiness(change=0) {
    this.happyMeter += change;
    if (this.happyMeter > 10) this.happyMeter = 10;
    if (this.happyMeter < 0) this.happyMeter = 0;
  }

  displayBunnyInfo() {
    const bunnyName = document.getElementById('bunny-name');
    bunnyName.innerHTML = `${this.name}`;
  }

  moveBunnyListener() {
    window.addEventListener('keydown', (event) => this.keys[event.keyCode] = true)
    window.addEventListener('keyup', () => this.keys[event.keyCode] = false)
    
    window.addEventListener('mousedown', (event) => this.isMouseDown = true)

    window.addEventListener('mousemove', (event) => {
      if (this.isMouseDown) {
        let offset = this.canvas.getBoundingClientRect();
        if (event.pageX >= offset.left && event.pageX <= offset.right && event.pageY >= offset.top && event.pageY <= offset.bottom && this.game.isFormHidden()) {
          let newX = Math.floor(event.pageX - offset.left);
          let newY = Math.floor(event.pageY - offset.top - (this.height / 2));
          let newCanvasWidth = offset.right - offset.left;
          let scaleCanvas = 1000/newCanvasWidth;
          
          let scaledX = Math.floor(newX * scaleCanvas);
          let scaledY = Math.floor(newY * scaleCanvas);

          let evenX = scaledX % 2 === 0 ? scaledX : scaledX - 1;
          let evenY = scaledY % 2 === 0 ? scaledY : scaledY - 1;
          this.newPos = [ evenX, evenY];
        }
      }
    })
    window.addEventListener('mouseup', (event) => {
      this.isMouseDown = false;
      this.newPos = [];
    })
  }

  cursorDirection() {
    if (this.newPos[0] > this.x + (this.width/2)) this.right = true;
    if (this.newPos[0] < this.x + (this.width / 2)) this.left = true;
    if (this.newPos[1] > this.y) this.down = true;
    if (this.newPos[1] < this.y) this.up = true;
  }

  updatePosition() {
    if (this.isMouseDown) this.cursorDirection();
    if (this.game.isFormHidden()) {
      if (this.keys[37] || this.left || this.keys[65]) { //37 = left arrow, 65 = a
        this.vel[0] = -Math.abs(this.vel[0]);
        this.x += this.vel[0];
      } 
      if (this.keys[38] || this.up || this.keys[87]) { //38 = up arrow, 87 = w
        this.vel[1] = -Math.abs(this.vel[1]);
        this.y += this.vel[1];
      }
      if (this.keys[39] || this.right || this.keys[68]) { //39 = right arrow, d = 68
        this.vel[0] = Math.abs(this.vel[0]);
        this.x += this.vel[0];
      }
      if (this.keys[40] || this.down || this.keys[83]) { //40 = down arrow, s = 83
        this.vel[1] = Math.abs(this.vel[1]);
        this.y += this.vel[1];
      } 
      if (this.isMoving() && this.isHopping) {
        this.y += this.hopVel;
        this.hopVel = -this.hopVel;
        this.isHopping = false;
      }
    }
    this.left = this.right = this.down = this.up = false;
    this.wrapXY();

  }

  isMoving() {
    return (this.keys[37] || this.keys[38] || this.keys[39] || this.keys[40] || this.left || this.right || this.down || this.up || this.keys[63] || this.keys[83] || this.keys[87] || this.keys[68]) && this.game.isFormHidden();
  }

  resetisHopping() {
    setInterval(() => {
      this.isHopping = true;;
    }, 700);
  }
  
  wrapXY() {
    if (this.x + this.width >= this.maxWidth) this.x = Math.floor(this.maxWidth - this.width);
    if (this.x < 0) this.x = 0;
    if (this.x + (this.width)> 500) {
      let minY = Math.floor(Math.abs((this.x / 2) - 70) - (this.height/2));
      let maxY = Math.floor(Math.abs((-this.x/2) + 765));
      if (this.y < minY) {
        this.y = minY;
        if (this.isFriend) this.vel[0] = -this.vel[0];
        if (this.isFriend) this.y += Math.floor(Math.random() * 10);
      }
      if (this.y > maxY) {
        this.y = maxY;
        if (this.isFriend) this.vel[0] = -this.vel[0];
        if (this.isFriend) this.y += Math.floor(Math.random() * 10);
      }
    } else {
      let minY = Math.floor(Math.abs((-this.x/2) + 430));
      let maxY = Math.floor(Math.abs((this.x / 2) + 355));
      if (this.y + this.height < minY) {
        this.y = Math.floor(minY - this.height);
        if (this.isFriend) this.vel[0] = -this.vel[0];
        if (this.isFriend) this.y -= Math.floor(Math.random() * 10);
      }
      if (this.y +(this.height/2)> maxY) {
        this.y = Math.floor(maxY - (this.height / 2));
        if (this.isFriend) this.vel[0] = -this.vel[0];
        if (this.isFriend) this.y -= Math.floor(Math.random() * 10);
      }
    }
    this.y = this.y % 2 === 0 ? this.y : this.y -1;
    this.x = this.x % 2 === 0 ? this.x : this.x -1;

  }
  
  loadHay() {
    this.hay = new Image();
    this.hay.src = `./src/images/hay.svg`;
    this.hay.alt = `hay`;

    const addHay = document.getElementById('add-hay');
    addHay.addEventListener('click', () => {
      if (this.game.form)
      this.hayPieces = 20
      this.game.budget -= 5;
    });
    setInterval(() => {
      this.hayPieces -= 1;
      if (this.hayPieces <= 0) {
        this.changeHappiness(-1);
      }
    }, 3000);
  }

  multiplyHay() {
    const dir =[-16, -17, -12, -8, -7, -4, -3, -1, 2, 6, 8, 13, -15, -6, 0, 3, 9, 11, 14, 16, ];
    for (let i = 0; i < this.hayPieces; i++) {
      this.drawHay(45*dir[i], [440 + dir[i], 560 + dir[i]]);
    }
  }
  
  drawHay(degree, hayPos) {
    let newCenterPos = [hayPos[0] + (this.hay.width/16), hayPos[1] +(this.hay.height/16)]
    this.ctx.save();
    this.ctx.translate(...newCenterPos);
    this.ctx.rotate(degree * (Math.PI / 180));
    this.ctx.translate(-newCenterPos[0], -newCenterPos[1]);
    this.ctx.drawImage(this.hay, ...hayPos, this.hay.width/8, this.hay.height/8);
    this.ctx.restore();
  }

  checkVegetables() {
    const goodVegs = ['cilantro', 'blackberry-leaf', 'basil'];
    const badVegs = ['leeks', 'tomato-leaf', 'iceberg'];

    let userVegs = this.game.checkboxInput();
    let numVegs = userVegs.length;
    this.game.budget -= numVegs * 1;

    let userGoodVegs = userVegs.filter(veg => goodVegs.includes(veg));
    let userBadVegs = userVegs.filter(veg => badVegs.includes(veg));

    if (userBadVegs.length > 0)  {
      this.changeHappiness(-1);
    } else if (userGoodVegs.length > 0) {
      this.changeHappiness(1);
    }

    return userBadVegs;
  }

  loadFriend() {
    this.friendImg = document.getElementById(`${this.color}-${this.emotion()}`);
    this.width = this.friendImg.width / 8;
    this.height = this.friendImg.height / 8;
    this.vel = [-6,6];
    setInterval(() => {
      this.x += this.vel[0];
      this.y += this.vel[1];
      this.vel[1] = -this.vel[1];
      this.wrapXY();
    }, 500);
    const EMOTIONS = ['happy', 'sad', 'mad'];
    this.randEmotion = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
    const VELS = [-40, -30, -20, -10, -8, -6, 6, 8, 10, 12, 20, 30, 40, 50];
    if (this.name === 'baby') this.vel = [VELS[Math.floor(Math.random() * VELS.length)], VELS[Math.floor(Math.random() * VELS.length)]];
  }

  drawFriend() {
    this.happyMeter = this.mainBunny.happyMeter;
    this.hayPieces = this.mainBunny.hayPieces;
    let orientation = this.vel[0] > 0 ? '-reverse' : '';
    this.friendImg = document.getElementById(`${this.color}-${this.emotion()}${orientation}`);
    this.ctx.drawImage(this.friendImg, this.x, this.y, this.width, this.height);
  }

  hopInterval() {
    setInterval(() => {
      this.y += this.hopVel;
      this.hopVel = -this.hopVel;
    }, 500);
  }
  drawBabyBun() {
    this.happyMeter = this.mainBunny.happyMeter;
    let orientation = this.vel[0] > 0 ? '-reverse' : '';
    this.friendImg = document.getElementById(`${this.color}-${this.randEmotion}${orientation}`);
    this.ctx.drawImage(this.friendImg, this.x, this.y, this.width/2, this.height/2);
  }

}