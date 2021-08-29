import Phaser from 'phaser';

export default class GreenVirus extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.setCollideWorldBounds(true);
    this.setVelocity(Phaser.Math.Between(0, 100), Phaser.Math.Between(0, 100));
    this.setBounce(1);
    this.setScale(0.75);
  }
}
