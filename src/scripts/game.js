// import Bunny from './scripts/bunny';
// import Lesson from './scripts/lessons';

export default class Game {
  constructor() {
    this.totalCost = 0;
    this.display = 'flex';
    this.popup = document.getElementById('popup');
    this.question = document.getElementById('question');
    this.submit = document.getElementById('submit');
    this.play();
  }
  play() {
    this.welcomeMessage();
    this.createBunny();
  }
  
  togglePopup() {
    console.log(this.display);
    let displayStyle = this.display === 'none' ? 'flex' : 'none';
    this.display = displayStyle;
    console.log(this.display)
    this.popup.style.display = displayStyle;
    console.log(this.popup.style.display)
  }
  
  welcomeMessage() {
    const welcome = 'Welcome to Bunny Prep! <br><br>This game will help you learn how to care for a bunny or rabbit. You will be assigned tasks and your goal is to keep your bunny happy and healthy. To begin, please choose which bunny you would like to adopt:'
    this.question.innerHTML = welcome;
    this.submit.onclick = () => this.togglePopup();
  }

  createBunny() {
    let welcomeForm = document.querySelector('.user-form')
    this.bunny = newBunny(name, color);
  }

  adoptAFriend() {
    this.prompt = `Congratuations! You have made ${this.bunny.name} super happy. As you have become a good pet owner, would you like to adopt a friend for ${this.bunny.name}.`
  }
}