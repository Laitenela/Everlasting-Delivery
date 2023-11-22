import { GameObject } from "../../modules/gameObject";

const animationAtlasEgg = {
  frames: {
    egg: {
      frame: { x: 0, y: 0, w: 16, h: 16 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    }
  },
  meta: {
    image: 'tilemaps/Objects/Egg item.png',
    format: 'RGBA8888',
    size: { w: 16, h: 16 },
    scale: 0.5
  },
  animations: {
    egg: ['egg']
  },
}

const animationAtlasFood = {
  frames: {
    item11: {
      frame: { x: 50, y: 30, w: 120, h: 120 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    item12: {
      frame: { x: 170, y: 30, w: 120, h: 120 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    item13: {
      frame: { x: 290, y: 30, w: 120, h: 120 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    item14: {
      frame: { x: 410, y: 30, w: 120, h: 120 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    item21: {
      frame: { x: 50, y: 150, w: 120, h: 120 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    item22: {
      frame: { x: 170, y: 150, w: 120, h: 120 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    item23: {
      frame: { x: 290, y: 150, w: 120, h: 120 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    item24: {
      frame: { x: 420, y: 150, w: 120, h: 120 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    item31: {
      frame: { x: 50, y: 270, w: 120, h: 120 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    item32: {
      frame: { x: 170, y: 270, w: 120, h: 120 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    item33: {
      frame: { x: 290, y: 270, w: 120, h: 120 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    item34: {
      frame: { x: 410, y: 270, w: 120, h: 120 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    item41: {
      frame: { x: 50, y: 390, w: 120, h: 120 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    item42: {
      frame: { x: 170, y: 390, w: 120, h: 120 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    item43: {
      frame: { x: 290, y: 390, w: 120, h: 120 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    item44: {
      frame: { x: 425, y: 390, w: 120, h: 120 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
  },
  meta: {
    image: 'tilemaps/food.png',
    format: 'RGBA8888',
    size: { w: 16, h: 16 },
    scale: 3.5
  },
  animations: {
    item11: ['item11'],
    item12: ['item12'],
    item13: ['item13'],
    item14: ['item14'],
    item21: ['item21'],
    item22: ['item22'],
    item23: ['item23'],
    item24: ['item24'],
    item31: ['item31'],
    item32: ['item32'],
    item33: ['item33'],
    item34: ['item34'],
    item41: ['item41'],
    item42: ['item42'],
    item43: ['item43'],
    item44: ['item44'],
    burger: ['item11'],
  },
}

export class Bullet extends GameObject {
  collisioned = true;
  type = 'bullet';
  speedX = 0;
  speedY = -9;
  positionX;
  positionY;

  collisionBox = {
    x: 10,
    y: 10,
    width: 12,
    height: 12,
  };

  constructor(positionX, positionY) {
    const foodKeys = Object.keys(animationAtlasFood.animations);
    const randomNum = Math.floor(Math.random() * foodKeys.length);
    super(animationAtlasFood, foodKeys[randomNum]);
    this.positionX = positionX;
    this.positionY = positionY;
  }

  async initialize() {
    this.sprite.x = this.positionX + 30;
    this.sprite.y = this.positionY + 30;
  }

  update(delta) {
    this.sprite.y += this.speedY * delta;

    this.collisionBox.y = this.sprite.y + 40;
    this.collisionBox.x = this.sprite.x + 30;

    if(this.sprite.y < -100) this.destroy();
  }

  onCollision(collisionGameObject){
    if(collisionGameObject.type === 'enemy') this.destroy();
  }

}