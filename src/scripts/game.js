import Bunny from './bunny.js';
import Lesson from './lessons.js';
import Room from './room.js';

export default class Game {
  constructor(canvas) {
    this.totalCost = 0;
    this.display = 'flex';
    this.question = document.getElementById('question');
    this.form = document.querySelector('.input-form');
    this.ctx = canvas.getContext("2d");
    this.room = new Room(canvas);
    eval(`this.welcomeMessage`).bind(this)();
  }

  play() {
    this.room.drawRoom();
    this.lesson = new Lesson(this, this.bunny);
    this.form.removeEventListener('submit', this.beingListenerBinded, false);
    this.runLesson(); 
    this.moveRabbit();
  }
  
  welcomeMessage() {
    const welcome = 'Welcome to Bunny Prep! <br><br>This game will help you learn how to care for a bunny or rabbit. You will be assigned tasks and your goal is to keep your bunny happy and healthy. <br>To begin, please choose which bunny you would like to adopt:'
    this.question.innerHTML = welcome;
    this.beingListenerBinded = this.beginListener.bind(this);
    this.form.addEventListener('submit', this.beingListenerBinded);
  }

  beginListener(event) {
    this.togglePopup(event);
    this.createBunny();
  }

  togglePopup(event) {
    if (event !== undefined) event.preventDefault();
    this.display = this.display === 'none' ? 'flex' : 'none';
    const popup = document.getElementById('popup');
    popup.style.display = this.display;
    // this.checkRadioInput();
  }
  
  createBunny() {
    let name = document.querySelector('input[name=bunny-name]').value;
    let color = this.checkRadioInput().split('-')[0];
    this.bunny = new Bunny(name, color, this.ctx);
    this.play();
  }

  moveRabbit() {
    setInterval(
      () => {
      this.bunny.updatePosition();
      this.room.clearRoom();
      this.room.drawRoom();
      this.bunny.drawBunny();
      } , 50);
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
    return this.currentLesson > 12 || this.bunny.happyMeter <=0
  }

  runLesson(){
    this.currentLesson = 0;
    eval(`this.lesson.lesson${this.currentLesson}`).bind(this.lesson)();
    this.question.innerHTML = this.lesson.longDirections;
    // this.form = 
    this.togglePopup();
    this.form.onsubmit = (event) => {
      this.togglePopup.bind(this)(event);
      this.currentLesson += 1;
      // this.runLesson();
    }
  }

  adoptAFriend() {
    this.prompt = `Congratuations! You have made ${this.bunny.name} super happy. As you have become a good pet owner, would you like to adopt a friend for ${this.bunny.name}.`
  }
}