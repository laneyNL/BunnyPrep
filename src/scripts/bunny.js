export default class Bunny {
  
  constructor(name, color, ctx) {
    this.name = name;
    this.color = color;
    this.ctx = ctx;
    this.happyMeter = 5;
    // this.loadBunnyImg();
    this.drawBunny();
    this.displayBunnyInfo();
  }

  loadBunnyImg() {
    let COLORS = ['brown', 'grey', 'black'];
    let EMOTION = ['happy', 'sad', 'mad', 'sleep'];
    let hiddenImgs = document.querySelector('.hiddenImgs');
    COLORS.forEach(color =>{
      EMOTION.forEach(emotion => {
        let img = document.createElement('img');
        img.src = `./images/${color}/${color}_${emotion}.png`;
        img.id = `${color}-${emotion}`;
        img.alt = `${color} bunny`;
        img.classList = 'bunny-image';
        hiddenImgs.appendChild(img);
      })
    })
  }

  drawBunny() {
    // console.log(this);
    // console.log(`${this.color}-${this.emotion()}`);
    // let bunnyImg = document.getElementById(`${this.color}-${this.emotion}`);

    const bunnyImg = new Image();
    bunnyImg.src = `./images/${this.color}/${this.color}_${this.emotion()}.png`;
    bunnyImg.classList ='bunny-image';
    bunnyImg.width = '20';
    console.log(bunnyImg);

    this.ctx.drawImage(bunnyImg, 200, 250, 80, 80);
  }

  emotion() {
    return 'happy';
  }

  hay() {
    
  }
  displayBunnyInfo() {
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

  changeHappiness(change=0) {
    this.happyMeter = (this.happyMeter + change) % 10;
    if (this.happyMeter < 0) this.happyMeter = 0;
  }

}