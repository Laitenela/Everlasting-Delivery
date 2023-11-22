import { GameObject } from "../../modules/gameObject";
import { gameController } from "../../../main";
import { Bullet } from "../../components/objects/bullet";

const animationAtlas = {
  frames: {
    rest1: {
      frame: { x: 0, y: 48, w: 48, h: 48 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    rest2: {
      frame: { x: 48, y: 48, w: 48, h: 48 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    moveBottom1: {
      frame: { x: 96, y: 0, w: 48, h: 48 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    moveBottom2: {
      frame: { x: 144, y: 0, w: 48, h: 48 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    moveLeft1: {
      frame: { x: 96, y: 96, w: 48, h: 48 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    moveLeft2: {
      frame: { x: 144, y: 96, w: 48, h: 48 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    moveRight1: {
      frame: { x: 96, y: 144, w: 48, h: 48 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    moveRight2: {
      frame: { x: 144, y: 144, w: 48, h: 48 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    moveTop1: {
      frame: { x: 96, y: 48, w: 48, h: 48 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    moveTop2: {
      frame: { x: 144, y: 48, w: 48, h: 48 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
  },
  meta: {
    image: 'tilemaps/Characters/Basic Charakter Spritesheet.png',
    format: 'RGBA8888',
    size: { w: 192, h: 192 },
    scale: 0.5
  },
  animations: {
    rest: ['rest1', 'rest2'],
    moveBottom: ['moveBottom1', 'moveBottom2'],
    moveLeft: ['moveLeft1', 'moveLeft2'],
    moveRight: ['moveRight1', 'moveRight2'],
    moveTop: ['moveTop1', 'moveTop2'],
  },
  animationSpeed: {
    rest: 0.05,
    moveBottom: 0.1,
    moveLeft: 0.1,
    moveRight: 0.1,
    moveTop: 0.1,
  }
}

export class Courier extends GameObject {
  rechargeInterval = 30;
  currentRechargeTime = 0;
  maxBullets = 1;
  bullets = 1;
  type = 'courier';
  shotIsPossible = true;
  changeAnimationIsPossible = {
    value: true,
    timeout: undefined,
  };
  maxSpeed = 7;
  accelerate = 0.6;
  deceleration = 0.8;
  speedX = 0;
  speedY = 0;

  constructor() {
    super(animationAtlas, 'rest');
  }

  async initialize() {
    this.sprite.animationSpeed = animationAtlas.animationSpeed['rest'];
    this.sprite.x = 550;
    this.sprite.y = 700;
    this.sprite.play();
  }

  update(delta) {
    let someKeyPressed = false;

    if(this.bullets !== this.maxBullets) this.currentRechargeTime += delta;
    else this.currentRechargeTime = 0;


    if(this.currentRechargeTime > this.rechargeInterval){
      if(this.bullets !== this.maxBullets) this.bullets++;
      this.currentRechargeTime %= this.rechargeInterval;
    }


    // if(this.isKeyDown('KeyS')){
    //   this.speedY += this.accelerate * delta;
      
    //   if(this.currentAnimation !== 'moveBottom'){
    //     this.changeAnimation('moveBottom');
    //   }

    //   someKeyPressed = true;
    // }

    if(this.isKeyDown('KeyW')){
      if(this.shotIsPossible){
        if(this.bullets !== 0){
          const bullet = new Bullet(this.sprite.x, this.sprite.y + 4);
          gameController.addObject(bullet);
          this.bullets--;
        }

        if(this.currentAnimation !== 'rest'){
          this.changeAnimation('rest');
        }

        this.shotIsPossible = false;
      }

      this.changeAnimationIsPossible.value = false;
      clearTimeout(this.changeAnimationIsPossible.timeout);
      this.changeAnimationIsPossible.timeout = setTimeout(() => this.changeAnimationIsPossible.value = true, 300);

    } else {
      this.shotIsPossible = true;
    }

    if(this.isKeyDown('KeyD') && this.changeAnimationIsPossible.value){
      this.speedX += this.accelerate * delta;
      
      if(!someKeyPressed && this.currentAnimation !== 'moveRight'){
        this.changeAnimation('moveRight');
      }

      someKeyPressed = true;
    }

    if(this.isKeyDown('KeyA') && this.changeAnimationIsPossible.value){
      this.speedX -= this.accelerate * delta;
      
      if(!someKeyPressed && this.currentAnimation !== 'moveLeft'){
        this.changeAnimation('moveLeft');
      }

      someKeyPressed = true;
    }

    if(!someKeyPressed){
      if(this.currentAnimation !== 'rest'){
        this.changeAnimation('rest');
      }
    }

    if(this.speedX < -this.maxSpeed) this.speedX = -this.maxSpeed;
    else if(this.speedX > this.maxSpeed) this.speedX = this.maxSpeed;

    if(this.speedY < -this.maxSpeed) this.speedY = -this.maxSpeed;
    else if(this.speedY > this.maxSpeed) this.speedY = this.maxSpeed;

    if(Math.abs(this.speedY) < 0.1) this.speedY = 0;
    if(Math.abs(this.speedX) < 0.1) this.speedX = 0;

    // if(this.speedX + this.speedY !== 0){
    //   const percentageX = 1 / (Math.abs(this.speedX) + Math.abs(this.speedY)) * Math.abs(this.speedX);
    //   const percentageY = 1 / (Math.abs(this.speedX) + Math.abs(this.speedY)) * Math.abs(this.speedY);
      
    //   this.speedX = (this.speedX * delta) * percentageX;
    //   this.speedY = this.speedY * delta * percentageY;

    // };

      this.sprite.x += this.speedX;
    // this.sprite.y += this.speedY;

    if(this.sprite.x < 0){
      this.sprite.x = 0;
      this.speedX = 0;
    } else if(this.sprite.x > 1100){
      this.sprite.x = 1100;
      this.speedX = 0;
    }

    if(this.sprite.y < 700){
      this.sprite.y = 700;
      this.speedY = 0;
    } else if(this.sprite.y > 720){
      this.sprite.y = 720;
      this.speedY = 0;
    }
    
    if(!(this.isKeyDown('KeyA') || this.isKeyDown('KeyD')) || !this.changeAnimationIsPossible.value){
      this.speedX *= this.deceleration;
      this.speedY *= this.deceleration;
    }
  }
}