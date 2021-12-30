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
    
  }
  
  welcomeMessage() {
    const welcome = 'Welcome to Bunny Prep! <br><br>This game will help you learn how to care for a bunny or rabbit. You will be assigned tasks and your goal is to keep your bunny happy and healthy. To begin, please choose which bunny you would like to adopt:'
    this.question.innerHTML = welcome;
    this.form.addEventListener('submit', (event) => {
      this.togglePopup.bind(this)(event);
      this.createBunny();
    });
  }

  togglePopup(event) {
    event.preventDefault();
    let displayStyle = this.display === 'none' ? 'flex' : 'none';
    this.display = displayStyle;
    this.popup.style.display = displayStyle;
    this.checkRadioInput();
  }
  
  createBunny() {
    let name = document.querySelector('input[name=bunny-name]').value;
    let color = this.checkRadioInput().split('-')[0];
    this.bunny = new Bunny(name, color);
  }

  checkRadioInput() {
    let radioInputs = document.querySelectorAll('input[type=radio]');
    let radioInput = '';
    radioInputs.forEach(input => {
      if (input.checked) radioInput = input.id;
    })
    return radioInput;
  }

  adoptAFriend() {
    this.prompt = `Congratuations! You have made ${this.bunny.name} super happy. As you have become a good pet owner, would you like to adopt a friend for ${this.bunny.name}.`
  }
}