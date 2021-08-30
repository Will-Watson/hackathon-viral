import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
    this.titleText;
  }

  preload() {}

  create() {
    this.titleText = this.add.text(200, 150, 'VIRAL', {
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
