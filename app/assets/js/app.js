import '../css/app.css';

// main class Game
class Game {
  constructor() {
    this.body = document.getElementById('body');
    this.canvas = document.getElementById('canvas');
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.ctx = this.canvas.getContext('2d');

    this.init();
  }

  // init state
  // if we can getContext in canvas -> start game
  // else show message
  init() {
    if (this.canvas.getContext) {
      this.start();
    } else {
      canvas.textContent = 'Sorry canvas not suport';
    }
  }

  start() {
    console.log('start');
  }
}

// run Game
const game = new Game();