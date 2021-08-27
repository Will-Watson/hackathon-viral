import Phaser from 'phaser';

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('BgScene');
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITE HERE >>
    this.load.image('artery', 'assets/backgrounds/InitialGameBackground.png');
  }

  create() {
    // Create Sprites
    // << CREATE SPRITE HERE >>
    this.add.image(400, 300, 'artery');
  }
}
