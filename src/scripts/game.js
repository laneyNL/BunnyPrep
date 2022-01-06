import Bunny from './bunny.js';
import Lesson from './lessons.js';
import Room from './room.js';

export default class Game {
  constructor(canvas) {
    this.budget = 250;
    this.question = document.getElementById('question');
    this.form = document.querySelector('.input-form');
    this.canvas = canvas;
    this.info = [];
    this.room = new Room(canvas, this);
    this.room.drawRoom();
    this.welcomeMessage();
    
  }

  welcomeMessage() {
    const welcome = "Welcome to Bunny Prep! <br><br>This game will help you learn how to care for a bunny or rabbit. You will be assigned tasks and your goal is to keep your bunny happy and healthy. You will lose the game if your bunny's happiness or the budget reaches 0. <br>To begin, please choose which bunny you would like to adopt:"
    this.question.innerHTML = welcome;
    this.createBunny = this.createBunny.bind(this);
    this.form.addEventListener('submit', this.createBunny);
  }
  
  togglePopup(event) {
    const popup = document.getElementById('popup');
    popup.classList.toggle('hidden');
    if (event) {
      event.preventDefault();
      if (event.target.classList.value === 'adOrSp') this.adoptOrSpay();
    };
    const addHay = document.getElementById('add-hay');
    addHay.disabled = this.isFormHidden() ? false : true;
  }
  
  createBunny(event) {
    if (event) this.togglePopup(event);
    let name = document.querySelector('input[name=bunny-name]').value;
    let color = this.radioInput().split('-')[0];
    this.bunny = new Bunny(name, color, this.canvas, this, false, '',200, 250);
    this.babyBuns = [];
    this.startGame();
  }
  
  startGame() {
    this.room.drawRoom();
    this.lesson = new Lesson(this, this.bunny);
    this.form.removeEventListener('submit', this.createBunny);
    this.form.addEventListener('submit', this.togglePopup.bind(this));
    this.runLesson(); 
    this.runGame();
  }

  runGame() {
    this.room.clearRoom();
    this.room.drawRoom();

    if (this.friend) this.friend.drawFriend();
    if (this.babyBuns.length) this.babyBuns.forEach(bun => bun.drawBabyBun());
    this.bunny.drawBunny();
    this.lesson.displayLessons();

    if (this.isFormHidden()) {
      if (this.lesson.target === 'dropping') {
          this.checkDroppingCollision();
      } else if (this.lesson.target === 'baby') {
        this.checkBabyCollision();
      } else if (this.lesson.target === 'friend') {
        if (this.bunny.isCollidedWith(this.friend)) this.lesson.lessonComplete();
      } else if (this.lesson.target) {
        this.checkFurnitureCollision();
      }
    }

    this.isGameOver() ? this.endGame() : window.requestAnimationFrame(this.runGame.bind(this));
  }

  isFormHidden() {
    const popup = document.getElementById('popup');
    return popup.classList.value === 'flex hidden' ? true : false;
  }

  radioInput() {
    let radioInputs = document.querySelectorAll('input[type=radio]');
    let radioInput = '';
    radioInputs.forEach(input => {
      if (input.checked) radioInput = input.id;
    })
    return radioInput;
  }

  checkboxInput() {
    let checkboxes = document.querySelectorAll('input[type=checkbox]');
    let checkboxInputs = [];
    checkboxes.forEach(input => {
      if (input.checked) checkboxInputs.push(input.id);
    })
    return checkboxInputs;
  }

  checkFurnitureCollision() {
    this.room.furnishings.forEach(furniture => {
      if (this.bunny.isCollidedWith(furniture) && furniture.name === this.lesson.target) {
          this.lesson.lessonComplete();
      }
    })
  }


  checkDroppingCollision() {
    if(this.room.droppings.length === 0) this.lesson.currentLessonNum += 1;
    this.room.droppings.forEach(drop => {
      if (this.bunny.isCollidedWith(drop)) {
        let indexDrop = this.room.droppings.indexOf(drop);
        this.room.droppings.splice(indexDrop, 1);
      }
    })
  }

  checkBabyCollision() {
    this.babyBuns.forEach(bun => {
      if (this.bunny.isCollidedWith(bun)) {
        let indexBun = this.babyBuns.indexOf(bun);
        this.babyBuns.splice(indexBun, 1);
      }
    })
  }
  
  isGameOver() {
    return this.lesson.currentLessonNum === 6 || this.lesson.currentLessonNum > 10 || this.bunny.happyMeter <= 0 || this.budget <= 0 || this.babyBuns.length > 20;
  }
  
  endGame() {
    this.form.innerHTML = `<input type="submit" value='Continue'>`;
    
    if (this.lesson.currentLessonNum === 6) {
      this.question.innerHTML = `Congratulations! You have completed Bunny Prep. Thank you for playing and learning.`
    } else if (this.budget <= 0) {
      this.question.innerHTML = `Your budget has reached $0. You have lost the game.`
    } else if (this.babyBuns.length){
      this.question.innerHTML = `You have let your bunny population get out of hand. You have lost the game.`
    } else if (this.bunny.happyMeter <= 0) {
      this.question.innerHTML = `${this.bunny.name}'s happiness has reached 0. You have lost the game.`
    }
    const popup = document.getElementById('popup');
    popup.classList = 'flex';

    let text = 'Game Ended';
    let offset = this.bunny.ctx.measureText(text).width;
    this.bunny.ctx.fillStyle = 'black';
    this.bunny.ctx.font = '30px sans-serif';
    this.bunny.ctx.fillText(text, 500-(offset/2), 425);
  }
  
  runLesson(){
    const task = document.getElementById('task-details');
    const infoBar = document.getElementById('info-learned');
    eval(`this.lesson.lesson${this.lesson.currentLessonNum}`).bind(this.lesson)();
  
    
    task.innerHTML = this.lesson.taskBar;
    if (this.info) this.info.push(`<i class="far fa-star"></i> ${this.lesson.info}`);
    this.togglePopup();
    
  }
  
  adoptOrSpay() {
    this.budget -= 200;
    let decision = this.radioInput();
    if (decision === 'adopt') this.lesson.currentLessonNum = 7;
    this.form.classList.replace('adOrSp', 'input-form');
    this.lesson.lessonComplete();
  }

  adoptFriend() {
    let name = document.querySelector('input[name=bunny-name]').value;
    let selectedColor = this.radioInput().split('-')[0];
    const colors = ['brown', 'grey', 'black'];
    let friendColor = colors[Math.floor(Math.random() * colors.length)];
    while (friendColor === selectedColor) {
      friendColor = colors[Math.floor(Math.random() * colors.length)];
    }
    this.friend = new Bunny(name, friendColor, this.canvas, this, true, this.bunny, 200, 250);
    this.bunny.name += ` and ${this.friend.name}`;
    let nameHeading = document.getElementById('name-heading');
    nameHeading.innerText = 'Names:'
  }

  multiplyBuns() {
    console.log('multiply');
    setInterval(()=> {
      const COLORS = ['brown', 'grey', 'black']
      let color = COLORS[Math.floor(Math.random() * COLORS.length)];
      let x = Math.floor(Math.random() * this.canvas.width);
      let y = Math.floor(Math.random() * (this.canvas.height / 2)) + Math.floor(this.canvas.height / 2);

      let newBun = new Bunny('baby', color, this.canvas, this, true, this.bunny, x, y)
      this.babyBuns.push(newBun);
    }, 500);
  }
  
}