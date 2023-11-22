import './style.css';
import * as PIXI from 'pixi.js';
import { gameConfig } from './game.config';
import { GameController } from './src/modules/gameController';
import { Courier } from './src/components/heroes/courier';
import { Enemy } from './src/components/enemies/enemy';
import { Ground } from './src/components/statics/ground';
import { BiomThing } from './src/components/statics/biomThings';
import { startApp } from './gameManager';

let app = new PIXI.Application({
  ...gameConfig.scene,
});

document.body.appendChild(app.view);

export const gameController = new GameController(app);

startApp();

// (async () => {

//   for(let i = 0; i <= 36; i++){
//     for(let j = 0; j <= 24; j++){
//       let ground = null;

//       if(i === 0){
//         ground = new Ground(i * 32, j * 32, 'groundLeft');
//       } else if(i === 36) {
//         ground = new Ground(i * 32, j * 32, 'groundRight');
//       } else {
//         ground = new Ground(i * 32, j * 32, 'groundMiddle');
//       }
      
//       await gameController.addObject(ground);
      
//       if(i !== 0 && i !== 36){
//         const randomValue = Math.random() * 50;
//         if(randomValue < 1){
//           const biomThing = new BiomThing(i * 32, j * 32);
//           await gameController.addObject(biomThing);
//         }
//       }
//     }
//   }

//   setInterval(async () => {
//     const newX = 100 + Math.floor(Math.random() * 950);
//     const newY = -100;
//     const enemy = new Enemy(newX, newY);
//     await gameController.addObject(enemy);
//   }, 2000)

//   const testSprite = new Courier();
//   await gameController.addObject(testSprite);

//   gameController.startUpdater();
// })();

// setTimeout(() => gameController.destroyObject(testSprite.id), 2000);