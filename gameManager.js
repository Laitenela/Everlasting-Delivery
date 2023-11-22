import './style.css';
import * as PIXI from 'pixi.js';
import { gameConfig } from './game.config';
import { gameController } from './main';
import { gameplayScene } from './src/components/scenes/gameplayScene';
import { sound } from '@pixi/sound';

sound.add('ukus', 'sounds/ukus.mp3');
sound.add('backSound', '/sounds/8bit_smells_line.mp3');

export const startApp = () => {
  gameController.startScene(gameplayScene);
}