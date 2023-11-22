import { GameObject } from "../../modules/gameObject";

const animationAtlas = {
  frames: {
    groundMiddle: {
      frame: { x: 32, y: 64, w: 16, h: 16 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    groundMiddle2: {
      frame: { x: 0, y: 0, w: 16, h: 16 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    groundMiddle3: {
      frame: { x: 48, y: 0, w: 16, h: 16 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    groundMiddle4: {
      frame: { x: 32, y: 16, w: 16, h: 16 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    groundMiddle5: {
      frame: { x: 80, y: 16, w: 16, h: 16 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    groundMiddle6: {
      frame: { x: 80, y: 0, w: 16, h: 16 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    groundMiddle7: {
      frame: { x: 48, y: 16, w: 16, h: 16 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    groundMiddle8: {
      frame: { x: 0, y: 16, w: 16, h: 16 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    groundLeft: {
      frame: { x: 16, y: 64, w: 16, h: 16 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    },
    groundRight: {
      frame: { x: 48, y: 64, w: 16, h: 16 },
      sourceSize: { w: 192, h: 192 },
      spriteSourceSize: { x: 0, y: 0, w: 192, h: 192 }
    }
  },
  meta: {
    image: 'tilemaps/Tilesets/Grass.png',
    format: 'RGBA8888',
    size: { w: 192, h: 192 },
    scale: 0.5
  },
  animations: {
    groundMiddle: ['groundMiddle'],
    groundMiddle2: ['groundMiddle2'],
    groundMiddle3: ['groundMiddle3'],
    groundMiddle4: ['groundMiddle4'],
    groundMiddle5: ['groundMiddle5'],
    groundMiddle6: ['groundMiddle6'],
    groundMiddle7: ['groundMiddle7'],
    groundMiddle8: ['groundMiddle8'],
    groundLeft: ['groundLeft'],
    groundRight: ['groundRight'],
  },
}

export class Ground extends GameObject {
  type = 'ground';
  positionX;
  positionY;
  constructor(positionX, positionY, frames) {
    if(frames === 'groundMiddle'){
      const tiles = Object.keys(animationAtlas.animations).slice(0, 8);
      const randomPosition = Math.floor(Math.random() * tiles.length);

      frames = tiles[randomPosition];
    }
    super(animationAtlas, frames);
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