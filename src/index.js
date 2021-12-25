import Bunny from './scripts/bunny';
import Game from './scripts/game';
import Lesson from './scripts/lessons';
import Room from './scripts/room';


window.addEventListener('DOMContentLoaded', (event) => {
  const room = document.getElementById('room');
  new Room(room);
  let game = new Game();
  game.play();
});