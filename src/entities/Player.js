import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setCollideWorldBounds(true);

    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
  }

  updateMovement(cursors) {
    if (cursors.left.isDown) {
      this.setAngle(180);
      this.setVelocityX(-360);
      if (this.body.touching.down) {
        this.play('run', true);
      }
    } else if (cursors.right.isDown) {
      this.setAngle(0);
      this.setVelocityX(360);
      if (this.body.touching.down) {
        this.play('run', true);
      }
    } else if (cursors.up.isDown) {
      this.setAngle(-90);
      this.setVelocityY(-360);
      if (this.body.touching.down) {
        this.play('run', true);
      }
    } else if (cursors.down.isDown) {
      this.setAngle(90);
      this.setVelocityY(360);
      if (this.body.touching.down) {
        this.play('run', true);
      }
    } else {
      this.play('idle');
      this.setVelocityX(0);
      this.setVelocityY(0);
    }
  }

  // Check which controller button is being pushed and execute movement & animation
  update(cursors) {
    // << INSERT CODE HERE >>
    this.updateMovement(cursors);
  }
}
