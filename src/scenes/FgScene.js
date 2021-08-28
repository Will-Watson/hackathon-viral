import Phaser from 'phaser';
import Player from '../entities/Player';

export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene');
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITES HERE >>
    // this.load.spritesheet(
    //   'soldierLegs',
    //   'assets/spritesheets/SoldierLegs.png',
    //   {
    //     frameWidth: 204,
    //     frameHeight: 124,
    //   }
    // );
    this.load.spritesheet(
      'soldierHandgun',
      'assets/spritesheets/SoldierHandgun.png',
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
    //this.legs = new Player(this, 20, 400, 'soldierLegs').setScale(0.25);
    this.player = new Player(this, 20, 400, 'soldierHandgun').setScale(0.25);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.createAnimations();
    // Create sounds
    // << CREATE SOUNDS HERE >>
    // Create collisions for all entities
    // << CREATE COLLISIONS HERE >>
  }

  createAnimations() {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('soldierHandgun', {
        start: 0,
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });
    // this.anims.create({
    //   key: 'runLegs',
    //   frames: this.anims.generateFrameNumbers('soldierLegs', {
    //     start: 0,
    //     end: 19,
    //   }),
    //   frameRate: 10,
    //   repeat: -1,
    // });
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('soldierHandgun', {
        start: 20,
        end: 39,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // << DO UPDATE LOGIC HERE >>
    //this.legs.update(this.cursors);
    this.player.update(this.cursors);
  }
}
