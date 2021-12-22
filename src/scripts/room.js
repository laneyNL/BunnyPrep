export default class Room {
  constructor(canvas) {
    this.room = canvas.getContext("2d");
    this.dimensions = { width: canvas.width, height: canvas.height };
    this.background();
  }
  
  background() {
    this.room.fillStyle = "#C6C0C0";
    this.room.fillRect(0, 0, this.dimensions.width, this.dimensions.height);
    this.room.strokeStyle = "black";
    this.room.fillStyle = 'rgba(245, 40, 145, 0.23)';
    this.room.beginPath();
    this.room.moveTo(350, 15); //top corner
    this.room.lineTo(350,215);
    this.room.lineTo(491,357); //bottom right
    this.room.lineTo(350,498);
    this.room.lineTo(209,357); //bottom left
    this.room.lineTo(209,157); // top left
    this.room.lineTo(350,15);
    this.room.lineTo(491,157); //top right
    this.room.lineTo(491,357);
    this.room.lineTo(350,215);
    this.room.lineTo(350,215);
    this.room.lineTo(209,357);
    this.room.stroke();
    this.room.fill();
  }
  
}