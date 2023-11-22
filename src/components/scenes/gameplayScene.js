import { Courier } from "@components/heroes/courier";
import { Enemy } from "@components/enemies/enemy";
import { BiomThing } from "@components/statics/biomThings";
import { Ground } from "@components/statics/ground";
import { gameController } from "@main/main";

export const gameplayScene = async () => {
  for(let i = 0; i <= 36; i++){
    for(let j = 0; j <= 24; j++){
      let ground = null;

      if(i === 0){
        ground = new Ground(i * 32, j * 32, 'groundLeft');
      } else if(i === 36) {
        ground = new Ground(i * 32, j * 32, 'groundRight');
      } else {
        ground = new Ground(i * 32, j * 32, 'groundMiddle');
      }
      
      await gameController.addObject(ground);
      
      if(i !== 0 && i !== 36){
        const randomValue = Math.random() * 50;
        if(randomValue < 1){
          const biomThing = new BiomThing(i * 32, j * 32);
          await gameController.addObject(biomThing);
        }
      }
    }
  }

  const startSpawnRate = 200;
  const minSpawnRate = 100;

  let currentSpawnRate = startSpawnRate;
  let currentInterval = 0;

  gameController.addInterval(async (delta) => {
    if(currentInterval >= currentSpawnRate){
      currentInterval = 0;

      if(currentSpawnRate > minSpawnRate){
        currentSpawnRate -= 2;
      }

      const newX = 100 + Math.floor(Math.random() * 950);
      const newY = -100;

      const enemyProperties = {
        health: 60,
      }

      const enemy = new Enemy(newX, newY, enemyProperties);
      await gameController.addObject(enemy);
    }

    currentInterval += delta;
  });

  gameController.addInterval((delta) => {
    if(gameController.gameIsOver) gameController.startScene(gameplayScene);

  })


  // setInterval(async () => {
  //   const newX = 100 + Math.floor(Math.random() * 950);
  //   const newY = -100;
  //   const enemy = new Enemy(newX, newY);
  //   await gameController.addObject(enemy);
  // }, 2000)

  const testSprite = new Courier();
  await gameController.addObject(testSprite);

  gameController.startUpdater();
}