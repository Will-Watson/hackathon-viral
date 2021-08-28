import Phaser from 'phaser';
import Player from '../entities/Player';

export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene');
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITES HERE >>
    this.load.spritesheet(
      'idleLegs',
      'assets/spritesheets/SoldierIdleFeet.png',
      {
        frameWidth: 253,
        frameHeight: 216,
      }
    );
    this.load.spritesheet(
      'runningLegs',
      'assets/spritesheets/SoldierRunningFeet.png',
      {
        frameWidth: 253,
        frameHeight: 216,
      }
    );
    this.load.spritesheet(
      'idleSoldier',
      'assets/spritesheets/SoldierHandgunIdle.png',
      {
        frameWidth: 253,
        frameHeight: 216,
      }
    );
    // Preload Sounds
    // << LOAD SOUNDS HERE >>
  }

  create() {
    // Create game entities
    // << CREATE GAME ENTITIES HERE >>
    this.legs = new Player(this, 20, 400, 'runningLegs').setScale(0.25);
    this.player = new Player(this, 20, 400, 'idleSoldier').setScale(0.25);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.createAnimations();
    // Create sounds
    // << CREATE SOUNDS HERE >>
    // Create collisions for all entities
    // << CREATE COLLISIONS HERE >>
  }

  createAnimations() {
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('runningLegs', {
        start: 1,
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('idleSoldier', {
        start: 1,
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // << DO UPDATE LOGIC HERE >>
    this.player.update(this.cursors);
    this.legs.update(this.cursors);
  }
}
