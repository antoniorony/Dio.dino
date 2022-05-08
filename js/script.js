class Dino {

  constructor() {
    this.dino = document.querySelector('.dino');
    this.background = document.querySelector('.background');
    this.isJumping = false;
    this.isGameOver = false; 
    this.position = 0;
    this.createCactus();
    document.addEventListener('keyup', (event)=>{this.handleKeyUp(event)});

  }

  handleKeyUp(event) {
    if(event == undefined) return;

    if (event.keyCode === 32) {
      if (!this.isJumping) {
        this.jump();
      }
    }
  }

  jump() {
    this.isJumping = true;
  
    let upInterval = setInterval(() => {
      if (this.position >= 150) {
        // Descendo
        clearInterval(upInterval);
  
        let downInterval = setInterval(() => {
          if (this.position <= 0) {
            clearInterval(downInterval);
            this.isJumping = false;
          } else {
            this.position -= 20;
            this.dino.style.bottom = this.position + 'px';
          }
        }, 20);
      } else {
        // Subindo
        this.position += 20;
        this.dino.style.bottom = this.position + 'px';
      }
    }, 20);
    this.createCactus();
  }
  
  createCactus() {
    if(this.background == undefined) this.background = document.querySelector('.background');
    let cactus = document.createElement('div');
    let cactusthisposition = 1000;
    let randomTime = Math.random() * 6000;
  
    if (this.isGameOver) return;
  
    cactus.classList.add('cactus');
    this.background.appendChild(cactus);
    cactus.style.left = cactusthisposition + 'px';
  
    let leftTimer = setInterval(() => {
      if (cactusthisposition < -60) {
        clearInterval(leftTimer);
        this.background.removeChild(cactus);
      } else if (cactusthisposition > 0 && cactusthisposition < 60 && this.position < 60) {
        clearInterval(leftTimer);
        this.isGameOver = true;
        document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
      } else {
        cactusthisposition -= 10;
        cactus.style.left = cactusthisposition + 'px';
      }
    }, 20);
  
    setTimeout(this.createCactus, randomTime);
  }
}

