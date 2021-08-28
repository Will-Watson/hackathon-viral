import Phaser from 'phaser';

export default class Bullet extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey, angle) {
    super(scene, x, y, spriteKey);

    this.scene = scene;
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);

    this.angle = angle;
    this.speed = Phaser.Math.GetSpeed(800, 1);
    this.lifespan = 900;
    this.body.setAllowGravity(false);
  }

  update(time, delta) {
    this.lifespan -= delta;
    const moveDistance = this.speed * delta;
    if (this.angle === 0) {
      this.x += moveDistance;
    } else if (this.angle === 90) {
      this.y += moveDistance;
    } else if (this.angle === -180) {
      this.x -= moveDistance;
    } else if (this.angle === -90) {
      this.y -= moveDistance;
    }

    if (this.lifespan <= 0) {
      this.setActive(false);
      this.setVisible(false);
    }
  }
}
