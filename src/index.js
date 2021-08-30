/** @type {import("../typings/phaser")} */

import Phaser from 'phaser';
import MainScene from './scenes/MainScene';
import BgScene from './scenes/BgScene';
import FgScene from './scenes/FgScene';
import TitleScene from './scenes/TitleScene';
import config from './config/config';

class Game extends Phaser.Game {
  constructor() {
    super(config);

    this.scene.add('BgScene', BgScene);
    this.scene.add('MainScene', MainScene);
    this.scene.add('FgScene', FgScene);
    this.scene.add('TitleScene', TitleScene);

    this.scene.start('TitleScene');
  }
}

window.onload = function () {
  window.game = new Game();
};
