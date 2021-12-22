import Room from './scripts/room';



window.addEventListener('DOMContentLoaded', (event) => {
  const room = document.getElementById('room');
  new Room(room);
});