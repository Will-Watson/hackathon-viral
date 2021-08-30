import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
    this.titleText;
  }

  preload() {
    this.load.image('artery', 'assets/backgrounds/InitialGameBackground.png');
  }

  create() {
    this.add.image(400, 300, 'artery');
    this.titleText = this.add.text(280, 200, 'VIRAL', {
      font: '75px Courier',
      fill: '#00ff00',
    });
    this.titleText.setInteractive({ useHandCursor: true });
    this.titleText.on('pointerdown', () => this.playGame());
  }

  playGame() {
    this.scene.switch('MainScene');
  }
}
