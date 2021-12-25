export default class Game {
  constructor() {
    this.totalCost = 0;
    this.display = 'none';
    this.popup = document.getElementById('popup');
    this.question = document.getElementById('question');
    this.submit = document.getElementById('submit')
    this.play();
  }
  play() {
    this.welcome();
  }
  
  togglePopup() {
    this.display === 'none' ? this.display = 'flex' : this.display = 'none';
    this.popup.style.display = this.display; 
  }
  
  welcome() {
    const welcome = 'Welcome to Bunny Prep! This game will help you learn how to care for a bunny or rabbit. You will be assigned tasks and your goal is to keep your bunny happy and healthy. To begin, please choose which bunny you would like to adopt:'
    this.question.innerHTML = welcome;
    this.submit.innerHTML = 'Begin Game';
    this.submit.onclick = () => this.togglePopup();
  }
}