import Phaser from 'phaser';

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, spriteKey) {
    super(scene, x, y, spriteKey);

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.world.enable(this);
    this.setCollideWorldBounds(true);
    this.angle = -90;

    this.fireDelay = 500;
    this.lastFired = 0;
    this.remainingBullets = 12;

    // << INITIALIZE PLAYER ATTRIBUTES HERE >>
  }

  updateMovement(cursors) {
    if (cursors.left.isDown) {
      this.setAngle(180);
      this.angle = 180;
      this.setVelocityX(-300);
      if (this.body.touching.down) {
        this.play('run', true);
      }
    } else if (cursors.right.isDown) {
      this.setAngle(0);
      this.angle = 0;
      this.setVelocityX(300);
      if (this.body.touching.down) {
        this.play('run', true);
      }
    } else if (cursors.up.isDown) {
      this.setAngle(-90);
      this.angle = -90;
      this.setVelocityY(-300);
      if (this.body.touching.down) {
        this.play('run', true);
      }
    } else if (cursors.down.isDown) {
      this.setAngle(90);
      this.angle = 90;
      this.setVelocityY(300);
      if (this.body.touching.down) {
        this.play('run', true);
      }
    } else {
      this.setVelocityX(0);
      this.setVelocityY(0);
      this.play('idle');
    }
  }

  // Check which controller button is being pushed and execute movement & animation
  update(time, player, cursors, fireBulletFn) {
    // << INSERT CODE HERE >>

    this.updateMovement(cursors);
    if (cursors.space.isDown) {
      if (this.remainingBullets === 0) {
        this.play('reload', true);
        setTimeout(() => {
          this.remainingBullets = 12;
        }, 1500);
      }
      if (this.remainingBullets > 0) {
        this.lastFired += 1;
        if (this.lastFired % 20 === 0) {
          this.play('shoot', true);
          fireBulletFn();
          this.remainingBullets -= 1;
        }
      }
    }
  }
}
