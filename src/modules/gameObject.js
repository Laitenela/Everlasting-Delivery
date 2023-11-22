import { gameController } from '../../main';
import { v4 as uuidv4 } from 'uuid';
import * as PIXI from 'pixi.js';
import { sound } from '@pixi/sound';

export class GameObject{
  id;
  sprite;
  #animationSprite;
  #promiseAnimation;
  currentAnimation;
  constructor(atlasData, currentAnimation){
    this.id = uuidv4();
    this.currentAnimation = currentAnimation;
    this.#animationSprite = new AnimationSprite(atlasData);
    this.#promiseAnimation = this.#animationSprite.getRenderer(currentAnimation);
  }

  async asyncInitialization(){
    this.sprite = await this.#promiseAnimation;
    await this.initialize();
    this.#promiseAnimation = null;
  }

  async initialize(){

  }

  changeAnimation(frames){
    this.sprite.textures = this.#animationSprite.getChanged(frames);
    this.currentAnimation = frames;
    this.sprite.animationSpeed = this.#animationSprite.atlasData.animationSpeed[frames];
    this.sprite.play();
  }

  playSound(name){
    sound.play(name);
  }

  onCollision(eventObject){
  }

  update(delta){
    
  }

  isKeyDown(keyCode){
    return Boolean(gameController.pressedKeys[keyCode]);
  }

  gameOverSignal(){
    gameController.gameOverSignal();
  }

  destroy(){
    gameController.destroyObject(this.id);
  }
}

class AnimationSprite{
  constructor(atlasData){
    this.atlasData = atlasData;
  }

  async getRenderer(currentAnimation){

    this.spriteSheet = new PIXI.Spritesheet(
      PIXI.BaseTexture.from(this.atlasData.meta.image),
      this.atlasData,
    )

    // this.spriteSheet = await PIXI.Assets.load(this.spriteSheet);
    // console.log(this.spriteSheet);
    await this.spriteSheet.parse();
    const sprite = new PIXI.AnimatedSprite(this.spriteSheet.animations[currentAnimation]);
    sprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    return sprite;
  }

  getChanged(frames){
    const textures = this.spriteSheet.animations[frames];
    return textures;
  }
}