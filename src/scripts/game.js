import Bunny from './bunny.js';
// import Lesson from './lessons.js';

export default class Game {
  constructor() {
    this.totalCost = 0;
    this.display = 'flex';
    this.popup = document.getElementById('popup');
    this.question = document.getElementById('question');
    this.submit = document.getElementById('submit');
    this.form = document.querySelector('.input-form')
    this.play();
  }
  play() {
    this.welcomeMessage();
    this.createBunny();
  }
  
  togglePopup(event) {
    event.preventDefault();
    let displayStyle = this.display === 'none' ? 'flex' : 'none';
    this.display = displayStyle;
    this.popup.style.display = displayStyle;
    this.checkRadioInput();
  }
  
  welcomeMessage() {
    const welcome = 'Welcome to Bunny Prep! <br><br>This game will help you learn how to care for a bunny or rabbit. You will be assigned tasks and your goal is to keep your bunny happy and healthy. To begin, please choose which bunny you would like to adopt:'
    this.question.innerHTML = welcome;
    // this.form.onsubmit = (event) => this.togglePopup(event);
    this.form.addEventListener('submit', this.togglePopup.bind(this));

  }

  createBunny() {
    let name = document.querySelector('[name=bunny-name]').value;
    // let color = document.querySelector()
    // this.bunny = new Bunny(name, color);
  }

  checkRadioInput() {
    let radioInputs = document.querySelectorAll('radio');
    radioInputs.forEach()
  }

  adoptAFriend() {
    this.prompt = `Congratuations! You have made ${this.bunny.name} super happy. As you have become a good pet owner, would you like to adopt a friend for ${this.bunny.name}.`
  }
}