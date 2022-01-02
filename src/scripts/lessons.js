// import Bunny from './scripts/bunny';

export default class Lesson {

  constructor(game, bunny) {
    this.longDirections = '';
    this.taskBar = '';
    this.info = '';
    this.game = game;
    this.bunny = bunny;
  }

  lesson0() {
    this.longDirections = `You can move ${this.bunny.name} around with your cursor or the arrow keys. Trying moving ${this.bunny.name} to the litterbox.`;
    this.taskBar = `Move ${this.bunny.name} to the litterbox.`;
    this.info = `Bunnies need to have access to hay 24/7. This should be the main part of their diet.`
  }
  lesson1() {
    this.longDirections = `${this.bunny.name} is hungry.`;
    this.taskBar = ``;
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

}