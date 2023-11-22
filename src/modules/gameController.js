import * as PIXI from 'pixi.js';
import { sound } from '@pixi/sound';

export class GameController {
  scene;
  gameObjects = {};
  gameIsOver = false;
  externalIntervalFunctions = [];
  collisionKeys = {};
  pressedKeys = {};
  constructor(scene) {
    this.scene = scene;
    this.#enableKeyboardListeners();
  }

  startUpdater() {
    this.scene.ticker.remove(this.#update, this);
    this.scene.ticker.add(this.#update, this);
  }

  addInterval(func){
    this.externalIntervalFunctions.push(func);
  }

  #update(delta) {
    const gameObjectIds = Object.keys(this.gameObjects);

    for (let gameObjectId of gameObjectIds) {
      this.scene.ticker.addOnce(this.gameObjects[gameObjectId].update, this.gameObjects[gameObjectId]);
    }

    for(let func of this.externalIntervalFunctions){
      this.scene.ticker.addOnce(func);
    }

    const checkCollision = (firstCollisionBox, secondCollisionBox) => {
      return !(
        ((firstCollisionBox.y + firstCollisionBox.height) < (secondCollisionBox.y)) ||
        (firstCollisionBox.y > (secondCollisionBox.y + secondCollisionBox.height)) ||
        ((firstCollisionBox.x + firstCollisionBox.width) < secondCollisionBox.x) ||
        (firstCollisionBox.x > (secondCollisionBox.x + secondCollisionBox.width))
      )
    }

    {
      const collisionKeys = Object.keys(this.collisionKeys);
      for (let i = 0; i < collisionKeys.length; i++) {
        for (let j = i + 1; j < collisionKeys.length; j++) {
          const firstCollisionBox = this.gameObjects[collisionKeys[i]]?.collisionBox;
          const secondCollisionBox = this.gameObjects[collisionKeys[j]]?.collisionBox;

          if(!this.gameObjects[collisionKeys[i]]?.collisioned || !this.gameObjects[collisionKeys[j]]?.collisioned) continue;

          if (!firstCollisionBox || !secondCollisionBox) continue;

          const x1 = this.gameObjects[collisionKeys[i]].sprite.x;
          const x2 = this.gameObjects[collisionKeys[j]].sprite.x;

          if (this.gameObjects[collisionKeys[i]].type === 'bullet' && this.gameObjects[collisionKeys[j]].type === 'enemy'){
            if((x1 - 30 - x2) !== 0){
              this.gameObjects[collisionKeys[j]].sprite.x += (x1 - 30 - x2) * delta / 5000;
            }
            // if(y1 - y2 > 0) {
            //   this.gameObjects[collisionKeys[j]].sprite.y += (y1 - y2) / distance * delta / 5;
            // }
          } else if(this.gameObjects[collisionKeys[j]].type === 'bullet' && this.gameObjects[collisionKeys[i]].type === 'enemy') {
            if((x2 - 30 - x1) !== 0){
              this.gameObjects[collisionKeys[i]].sprite.x += (x2 - 30 - x1) * delta / 5000;
            }
            // if(y2 - y1 > 0){
            //   this.gameObjects[collisionKeys[i]].sprite.y += (y2 - y1) / distance * delta / 5;
            // }
          }

          if (!checkCollision(firstCollisionBox, secondCollisionBox)) continue;

          const object1 = this.gameObjects[collisionKeys[i]];
          const object2 = this.gameObjects[collisionKeys[j]];
          this.gameObjects[collisionKeys[i]].onCollision(object2);
          this.gameObjects[collisionKeys[j]].onCollision(object1);

        }
      }
    }
  }

  gameOverSignal(){
    this.gameIsOver = true;
  }

  startScene(scene) {
    this.clearScene();
    this.gameIsOver = false;
    sound.stopAll();
    sound.play('backSound');
    scene();
  }

  clearScene() {
    for (let gameObjectId of Object.keys(this.gameObjects)) {
      this.destroyObject(gameObjectId);
    }

    this.externalIntervalFunctions = [];
  }

  pauseUpdater() {
    this.scene.ticker.stop();
  }

  async addObject(gameObject) {

    await gameObject.asyncInitialization();
    this.gameObjects[gameObject.id] = gameObject;

    if (this.gameObjects[gameObject.id].collisionBox)
      this.collisionKeys[gameObject.id] = 1;

    this.scene.stage.addChild(gameObject.sprite);
  }

  destroyObject(gameObjectId) {
    this.scene.stage.removeChild(this.gameObjects[gameObjectId].sprite);
    delete this.gameObjects[gameObjectId];
    delete this.collisionKeys[gameObjectId];
  }

  #enableKeyboardListeners() {
    document.addEventListener('keydown', (event) => {
      this.pressedKeys[event.code] = 1;
    });

    document.addEventListener('keyup', (event) => {
      this.pressedKeys[event.code] = 0;
    })
  }
}