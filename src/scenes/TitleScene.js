import Phaser from 'phaser';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
    this.titleText;
    this.startText;
  }

  preload() {
    this.load.image('artery', 'assets/backgrounds/InitialGameBackground.png');
  }

  create() {
    console.log(this.backgroundMusic);

    this.add.image(400, 300, 'artery');

    this.titleText = this.add.text(280, 200, 'VIRAL', {
      font: '75px Courier',
      fill: '#00ff00',
    });
    this.startText = this.add.text(330, 350, 'START', {
      font: '40px Courier',
      fill: '#00ff00',
    });

    this.startText.setInteractive({ useHandCursor: true });
    this.startText.on('pointerdown', () => this.playGame());
  }

  playGame() {
    this.scene.switch('MainScene');
  }
}
