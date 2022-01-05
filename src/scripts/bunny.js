import ConnectingObject from './connecting_object';

export default class Bunny extends ConnectingObject {
  
  constructor(name, color, canvas, game, isFriend, mainBunny) {
    super(name, 200, 250);
    this.color = color;
    this.maxWidth = canvas.width;
    this.maxHeight = canvas.height;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.game = game;
    this.happyMeter = 5;
    this.keys = {};
    this.vel = [-2, 3]
    this.newPos = [];
    this.isFriend = isFriend;
    this.isFriend ? this.loadFriend() : this.loadBunny();
    this.hayPieces = 20;
    this.mainBunny = mainBunny;
  }
  
  // resizeBunnyCanvas() {
  //   this.canvas = this.game.canvas;
  //   this.maxWidth = this.canvas.width;
  //   this.maxHeight = this.canvas.height;
  //   this.ctx = this.canvas.getContext("2d");
  // }

  loadBunny() {
    this.loadHay();
    this.bunnyImg = document.getElementById(`${this.color}-${this.emotion()}`);
    this.width = this.bunnyImg.width/8;
    this.height = this.bunnyImg.height/8;
    this.drawBunny.bind(this)();
    
    this.moveBunnyListener();
    this.displayBunnyInfo();
    this.hopVel = 5;
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
  }

  emotion() {
    if (this.happyMeter < 2) return 'mad';
    if (this.happyMeter > 4) return 'happy';
    return 'sad';
  }
  
  changeHappiness(change=0) {
    this.happyMeter = (this.happyMeter + change) % 11;
    if (this.happyMeter < 0) this.happyMeter = 0;
  }

  displayBunnyInfo() {
    const bunnyName = document.getElementById('bunny-name');
    const bunnyHeart = document.getElementById('bunny-heart');
    const budget = document.getElementById('budget');
    bunnyName.innerHTML = `${this.name}`;
    bunnyHeart.innerHTML = '';
    budget.innerHTML = `${this.game.budget}`;
    
    for(let i = 0; i < 10; i++) {
      let heartType = (i < this.happyMeter) ? 'heart' : 'empty-heart';
      let heartImg = document.createElement('img');
      heartImg.src = `./images/${heartType}.png`;
      heartImg.alt = `${heartType}`;
      heartImg.width = '15';

      bunnyHeart.appendChild(heartImg);
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
      const pop = document.getElementById('popup');
      let offset = this.canvas.getBoundingClientRect();
      if (event.pageX >= offset.left && event.pageX <= offset.right && event.pageY >= offset.top && event.pageY <= offset.bottom && (pop.classList.value !== 'flex')) {
        let newX = event.pageX - offset.left;
        let newY = event.pageY - offset.top - (this.height / 2);
        this.newPos = [newX, newY];
      }
    })
    window.addEventListener('mouseup', (event) => {
      this.left = this.right = this.down = this.up = false;
      this.newPos = [];
    })
  }

  cursorDirection() {
    if (this.newPos[0] > this.x) this.right = true;
    if (this.newPos[0] < this.x) this.left = true;
    if (this.newPos[1] > this.y) this.down = true;
    if (this.newPos[1] < this.y) this.up = true;
  }

  updatePosition() {
    if (this.newPos.length) this.cursorDirection();
    if (this.keys[37] || this.left) { //37 = left arrow
      this.vel[0] = -Math.abs(this.vel[0]);
      this.x += this.vel[0];
    } 
    if (this.keys[38] || this.up) { //38 = up arrow
      this.vel[1] = -Math.abs(this.vel[1]);
      this.y += this.vel[1];
    }
    if (this.keys[39] || this.right) { //39 = right arrow
      this.vel[0] = Math.abs(this.vel[0]);
      this.x += this.vel[0];
    }
    if (this.keys[40] || this.down) { //40 = down arrow
      this.vel[1] = Math.abs(this.vel[1]);
      this.y += this.vel[1];
    } 
    if (this.isMoving() && this.isHopping) {
      this.y += this.hopVel;
      this.hopVel = -this.hopVel;
      this.isHopping = false;
    }
    
    this.wrapXY();
  }
  isMoving() {
    return this.keys[37] || this.keys[38] || this.keys[39] || this.keys[40] || this.left || this.right || this.down || this.up;
  }

  resetisHopping() {
    setInterval(() => {
      this.isHopping = true;;
    }, 500);
  }
  
  wrapXY() {
    if (this.x + this.width >= this.maxWidth) {
      this.x = this.maxWidth - this.width;
      this.vel[0] = -this.vel[0];
      if(this.isFriend) this.y += Math.floor(Math.random()*10);
    }
    if (this.y + this.height >= this.maxHeight) {
      this.y = this.maxHeight - this.height;
    }
    if (this.x < 0) {
      this.x = 0;
      this.vel[0] = -this.vel[0];
      if (this.isFriend) this.y -= Math.floor(Math.random() * 10);
    }
    if (this.y < 0) {
      this.y = 0;
    }
  }
  
  loadHay() {
    this.hay = new Image();
    this.hay.src = `./images/hay.svg`;
    this.hay.alt = `hay`;

    const addHay = document.getElementById('add-hay');
    addHay.addEventListener('click', () => {
      this.hayPieces = 20
      this.game.budget -= 5;
    });
    setInterval(() => {
      this.hayPieces -= 1;
      if (this.hayPieces <= 0) {
        this.changeHappiness(-1);
      }
    }, 5000);
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
    this.vel = [-5,5];
    setInterval(() => {
      this.x += this.vel[0];
      this.y += this.vel[1];
      this.vel[1] = -this.vel[1];
      this.wrapXY();
    }, 500);
  }

  drawFriend() {
    this.happyMeter = this.mainBunny.happyMeter;
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

  clearhopInterval() {
    clearInterval(this.hopInterval);
  }
  setHopInterval() {
    console.log(this.hopInterval)
    this.clearhopInterval();
    this.hopInterval();
    setTimeout(this.clearhopInterval, 2000);
  }

}