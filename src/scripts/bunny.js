export default class Bunny {
  
  constructor(name, color, ctx) {
    this.name = name;
    this.color = color;
    this.ctx = ctx;
    this.happyMeter = 5;
    this.x = 200;
    this.y = 250;
    this.drawBunny();
    this.displayBunnyInfo();
    this.moveRabbitListener();
    this.key;
  }

  drawBunny() {
    const bunnyImg = new Image();
    bunnyImg.src = `./images/${this.color}/${this.color}_${this.emotion()}.png`;
    bunnyImg.classList ='bunny-image';
    bunnyImg.alt = `${this.emotion()} ${this.color} bunny`

    bunnyImg.onload = () => this.ctx.drawImage(bunnyImg, this.x, this.y, 200,200);
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
      let heartImg = document.createElement('img');
      if (i < this.happyMeter) {
        heartImg.src = `./images/heart.png`;
        heartImg.alt = 'heart';
      } else {
        heartImg.src = `./images/empty-heart.png`;
        heartImg.alt = 'empty heart';
      }
      heartImg.width = '15';
      bunnyDisplay.appendChild(heartImg);
    }
    
  }

  moveRabbitListener() {
    window.addEventListener('keydown', (event) => {
      this.key = event.keyCode;
    })
    window.addEventListener('keyup', () => {
      this.key = false;
    })
    window.addEventListener('mousemove', (event) => {
      this.x = event.pageX;
      this.y = event.pageY;
    })
  }

  updatePosition() {
    console.log(this.x, this.y);
    if (this.key === 37) this.x -= 1; //37 = left arrow
    if (this.key === 38) this.y -= 1; //37 = up arrow
    if (this.key === 39) this.x += 1; //37 = right arrow
    if (this.key === 40) this.y += 1; //37 = down arrow
  }
  
  hay() {
    
  }
}