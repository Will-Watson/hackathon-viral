import Phaser from 'phaser';

export default class BlueVirus extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
  }
  setTarget(target) {
    this.target = target;
  }
  update(time, delta) {
    const tx = this.target.x;
    const ty = this.target.y;

    const x = this.x;
    const y = this.y;

    const rotation = Phaser.Math.Angle.Between(x, y, tx, ty);
    this.setRotation(rotation);
  }
}
