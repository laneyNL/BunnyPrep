import Bunny from './scripts/bunny';
import Game from './scripts/game';
import Lesson from './scripts/lessons';
import Room from './scripts/room';


window.addEventListener('DOMContentLoaded', (event) => {
  const canvas = document.getElementById('canvas');
  let game = new Game(canvas);

  const sound = document.getElementById('volume-icon');
  const audio = document.getElementById('audio');
  audio.volume = 0.05;
  audio.pause();
  sound.addEventListener('click', () => {
    if (sound.classList.value === 'fas fa-volume-mute') {
      sound.classList = 'fas fa-volume-up';
      audio.play();
    } else {
      sound.classList = 'fas fa-volume-mute';
      audio.pause();
    }
  })

  const displayCredit = document.getElementById('credit-button');
  const credits = document.getElementById('credits');
  displayCredit.onclick = () => {
    credits.classList.toggle('hidden');
    if (displayCredit.innerText === 'Display Credits') {
      displayCredit.innerText = 'Hide Credits'
    } else {
      displayCredit.innerText = 'Display Credits'
    }
  }
});
