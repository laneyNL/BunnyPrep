export default class Bunny {
  
  constructor(name, color, ctx) {
    this.name = name;
    this.color = color;
    this.ctx = ctx;
    this.happyMeter = 5;
    this.x = 200;
    this.y = 250;
    this.width = 100;
    this.height = 100;
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
      this.x = event.pageX - 280;
      this.y = event.pageY - 80;
    })
  }

  updatePosition() {
    if (this.keys[37]) this.x -= 1; //37 = left arrow
    if (this.keys[38]) this.y -= 1; //38 = up arrow
    if (this.keys[39]) this.x += 1; //39 = right arrow
    if (this.keys[40]) this.y += 1; //40 = down arrow
  }
  
  isCollidedWith(otherObj) {
    let isCollided = true;
    let rightX = this.x + this.width;
    let bottomY = this.y + this.height;


    // if() {
    //   isCollided = false;
    // }
    return isCollided;
  }
  hay() {
    
  }
}