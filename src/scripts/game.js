import Bunny from './bunny.js';
import Lesson from './lessons.js';
import Room from './room.js';
import ConnectingObject from './connecting_object.js';

export default class Game {
  constructor(canvas) {
    this.budget = 500;
    this.display = 'flex';
    this.question = document.getElementById('question');
    this.form = document.querySelector('.input-form');
    this.canvas = canvas;
    this.info = [];
    this.room = new Room(canvas);
    this.allFurniture = [];
    this.welcomeMessage();
  }

  welcomeMessage() {
    const welcome = "Welcome to Bunny Prep! <br><br>This game will help you learn how to care for a bunny or rabbit. You will be assigned tasks and your goal is to keep your bunny happy and healthy. You will loss the game if your bunnie's happiness or the budget reaches 0. <br>To begin, please choose which bunny you would like to adopt:"
    this.question.innerHTML = welcome;
    this.createBunny = this.createBunny.bind(this);
    this.form.addEventListener('submit', this.createBunny);
  }
  
  togglePopup(event) {
    if (event !== undefined) event.preventDefault();
    this.display = this.display === 'none' ? 'flex' : 'none';
    const popup = document.getElementById('popup');
    popup.style.display = this.display;
  }
  
  createBunny(event) {
    if (event) event.preventDefault();
    let name = document.querySelector('input[name=bunny-name]').value;
    let color = this.checkRadioInput().split('-')[0];
    this.bunny = new Bunny(name, color, this.canvas, this);
    this.startGame();
  }
  
  startGame() {
    this.room.drawRoom();
    this.lesson = new Lesson(this, this.bunny);
    this.form.removeEventListener('submit', this.createBunny);
    this.form.addEventListener('submit', (event) => this.togglePopup(event));
    this.runLesson(); 
    this.runGame();
  }

  runGame() {
    this.room.clearRoom();
    this.room.drawRoom();
    this.bunny.drawBunny();
    this.lesson.displayLessons();

    this.room.furnishings.forEach(furniture => {
      if (this.bunny.isCollidedWith(furniture) && furniture.name === this.lesson.target) {
        this.lesson.lessonComplete();
      }
    })

    let that = this.runGame.bind(this);
    this.isGameOver() ? this.endGame() : window.requestAnimationFrame(that);
  }

  checkRadioInput() {
    let radioInputs = document.querySelectorAll('input[type=radio]');
    let radioInput = '';
    radioInputs.forEach(input => {
      if (input.checked) radioInput = input.id;
    })
    return radioInput;
  }

  isGameOver() {
    return this.lesson.currentLessonNum > 12 || this.bunny.happyMeter <= 0 || this.budget <= 0;
  }

  endGame() {
    if (this.lesson.currentLessonNum > 12) {
      this.question.innerHTML = `Congratulations! You have completed Bunny Prep. Thank you for playing and learning.`
    } else if (this.budget <= 0) {
      this.question.innerHTML = `Your budget has reached $0. You have lost the game.`
    } else {
      this.question.innerHTML = `${this.bunny.name}'s happiness has reached 0. You have lost the game.`
    }
    this.togglePopup();  
  }

  runLesson(){
    const task = document.getElementById('task-details');
    const infoBar = document.getElementById('info-learned');
    eval(`this.lesson.lesson${this.lesson.currentLessonNum}`).bind(this.lesson)();

    this.question.innerHTML = this.lesson.longDirections;
    this.form.innerHTML = this.lesson.form;
    task.innerHTML = this.lesson.taskBar;
    this.info.push(`🥕 ${this.lesson.info}`);
    this.togglePopup();
    
  }


}