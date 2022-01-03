// import Bunny from './scripts/bunny';

export default class Lesson {

  constructor(game, bunny) {
    this.currentLessonNum = 0;
    this.longDirections = '';
    this.form = ``;
    this.taskBar = '';
    this.info = '';
    this.game = game;
    this.bunny = bunny;
  }

  lesson0() {
    this.longDirections = `Bunnies eat hay all day. Keep an eye on the hay pile and refill it often. ${this.bunny.name} will lose hearts if the hay is gone.`;
    this.form = `<input type="submit" value='Continue'>`;
    this.taskBar = `Click on the 'Add Hay' button to refill the rabbit's hay.`;
    this.info = `Bunnies need to have access to hay 24/7. This should be the main part of their diet.`
    const addHay = document.getElementById('add-hay');
    addHay.onclick = lessonComplete;
      
  }

  lessonComplete() {
    this.currentLessonNum += 1;
    this.game.runLesson();
  }

  lesson1(){
    const addHay = document.getElementById('add-hay');
    addHay.removeEventListener('click', lessonComplete);
    this.longDirections = `You can move ${this.bunny.name} around with your cursor or the arrow keys. Trying moving ${this.bunny.name} to the litterbox.`;
    this.taskBar = `Move ${this.bunny.name} to the litterbox.`;
    this.info = `Bunnies can be trained to use the litterbox just like cats.`
  }

  lesson2() {
    this.longDirections = ``;
    this.taskBar = ``;
  }

  lesson3() {
    this.longDirections = ``;
    this.taskBar = ``;
  }

  lesson4() {
    this.longDirections = ``;
    this.taskBar = ``;
  }

  lesson5() {
    this.longDirections = ``;
    this.taskBar = ``;
  }

  lesson6() {
    this.longDirections = ``;
    this.taskBar = ``;
  }

  lesson7() {
    this.longDirections = ``;
    this.taskBar = ``;
  }

  lesson8() {
    this.longDirections = `${this.name} is bored and would like to go outside. Would you like to allow ${this.name} to go outside to play?`;
    this.taskBar = ``;
    this.info = `House bunnies should be kept indoors. When outside bunnies are exposed to diseases and predators.`
  }

  lesson9() {
    this.longDirections = ``;
    this.taskBar = ``;
  }

  lesson10() {
    this.longDirections = ``;
    this.taskBar = ``;
  }

  lesson11() {
    this.longDirections = ``;
    this.taskBar = ``;
  }

  adoptAFriend() {
    this.prompt = `Congratuations! You have made ${this.bunny.name} super happy. As you have become a good pet owner, would you like to adopt a friend for ${this.bunny.name}.`
  }

}