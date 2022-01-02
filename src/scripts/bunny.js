import ConnectingObject from './connecting_object';
import Furniture from './furniture';

export default class Bunny extends ConnectingObject {
  
  constructor(name, color, ctx) {
    super(name, 200, 250, 100, 100);
    this.color = color;
    this.ctx = ctx;
    this.happyMeter = 5;
    this.keys = {};
    this.loadBunny();
  }
  
  loadBunny() {
    this.moveBunnyListener();
    this.displayBunnyInfo();

    this.bunnyImg = new Image();
    this.bunnyImg.src = `./images/${this.color}/${this.color}_${this.emotion()}.png`;
    this.bunnyImg.classList = 'bunny-image';
    this.bunnyImg.alt = `${this.emotion()} ${this.color} bunny`;
    this.bunnyImg.onload = this.drawBunny.bind(this);
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
      let offsetWidth = document.querySelector('.left-sidebar').scrollWidth;
      let offsetHeight = document.querySelector('h1').offsetHeight;
      // console.log('off', offsetWidth, offsetHeight);
      this.x = event.pageX - offsetWidth;
      this.y = event.pageY - offsetHeight;
      // console.log(`event`, event.pageX, event.pageY);
      // console.log(this.x,this.y);
    })
  }

  updatePosition() {
    if (this.keys[37]) this.x -= 1; //37 = left arrow
    if (this.keys[38]) this.y -= 1; //38 = up arrow
    if (this.keys[39]) this.x += 1; //39 = right arrow
    if (this.keys[40]) this.y += 1; //40 = down arrow
  }

  wrapXY() {
    if (this.x > 0 && this.y > 0) {
      this.x = this.x % this.maxWidth;
      this.y = this.y % this.maxHeight
    }
    if (this.x < 0) this.x = 0;
    if (this.y < 0) this.y = 0;
  }
  
  

  hay() {
    
  }
}