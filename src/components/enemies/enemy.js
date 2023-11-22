import { GameObject } from "../../modules/gameObject";

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
    moveBottom: 0.05,
    moveLeft: 0.1,
    moveRight: 0.1,
    moveTop: 0.1,
  }
}

export class Enemy extends GameObject {
  collisioned = true;
  health = 100;
  type = 'enemy';
  speedX = 0;
  speedY = 1.2;
  positionX;
  positionY;

  collisionBox = {
    x: 100,
    y: 10,
    width: 40,
    height: 55,
  }

  constructor(positionX, positionY, properties = {health: 100}) {
    super(animationAtlas, 'moveBottom');
    this.positionX = positionX;
    this.positionY = positionY;
    this.health = properties.health;
  }

  async initialize() {
    this.sprite.animationSpeed = animationAtlas.animationSpeed['moveBottom'];
    this.sprite.x = this.positionX;
    this.sprite.y = this.positionY;
    this.sprite.play();
  }

  update(delta) {
    if (this.health > 0) {
      this.sprite.y += this.speedY * delta;

      if(this.sprite.y > 810){
        this.gameOverSignal();
      }

    } else if (this.direction) {
      this.sprite.y += this.speedY * Math.sin(this.direction);
      this.sprite.x += this.speedY * Math.cos(this.direction);

      if (
        this.sprite.y < -100 || 
        this.sprite.x < -100 || 
        this.sprite.x > 1300
      ) {
        this.destroy();
      }

      // this.sprite.y -= this.speedY * delta;
      // this.sprite.x -= this.speedY * delta;
    }

    this.collisionBox.x = this.sprite.x + 45;
    this.collisionBox.y = this.sprite.y + 40;
  }

  onCollision(collisionGameObject) {
    if (collisionGameObject.type === 'bullet') this.health -= 30;
    if (this.health <= 0) {
      this.collisioned = false;
      this.sprite.alpha = 0.8;
      setTimeout(() => {
        this.direction = -Math.random() * Math.PI;
      }, 400)
    };
    this.playSound('ukus');
  }
}