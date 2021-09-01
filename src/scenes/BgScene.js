import Phaser from 'phaser';

export default class BgScene extends Phaser.Scene {
  constructor() {
    super('BgScene');
  }

  preload() {
    // Preload Sprites

    this.load.image('artery', 'assets/backgrounds/InitialGameBackground.png');
  }

  create() {
    // Create Sprites

    this.add.image(400, 300, 'artery');
  }
}
