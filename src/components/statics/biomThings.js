import { GameObject } from "../../modules/gameObject";

const animationAtlas = {
  frames: {
    mushroom1: {
      frame: { x: 80, y: 0, w: 16, h: 16 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    mushroom2: {
      frame: { x: 112, y: 34, w: 16, h: 16 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    mushroom3: {
      frame: { x: 82, y: 48, w: 16, h: 16 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    }
  },
  meta: {
    image: 'tilemaps/Objects/Biom things.png',
    format: 'RGBA8888',
    size: { w: 192, h: 192 },
    scale: 0.5
  },
  animations: {
    mushroom1: ['mushroom1'],
    mushroom2: ['mushroom2'],
    mushroom3: ['mushroom3'],
  },
}

export class BiomThing extends GameObject {
  type = 'biomThings';
  positionX;
  positionY;
  constructor(positionX, positionY) {
    const tile = Object.keys(animationAtlas.animations)[Math.floor(Math.random() * Object.keys(animationAtlas.animations).length)];
    super(animationAtlas, tile);
    this.positionX = positionX;
    this.positionY = positionY;
  }

  async initialize() {
    this.sprite.x = this.positionX;
    this.sprite.y = this.positionY;
  }

  update(delta) {
  }
}