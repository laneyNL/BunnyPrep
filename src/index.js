import Game from './scripts/game';

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
  }
  const fosterButton = document.getElementById('foster-button');
  const foster = document.getElementById('foster');

  fosterButton.onclick = () => {
    foster.classList.toggle('hidden');
  }
});
