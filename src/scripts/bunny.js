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
    let bunnyName = document.getElementById('bunny-name');
    let nameText = document.createElement('p');
    nameText.innerHTML = `${this.name}`;
    bunnyName.appendChild(nameText);
    let bunnyDisplay = document.getElementById('bunny-display');
    
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
  
  updatePosition() {
    
  }
  
  hay() {
    
  }
}