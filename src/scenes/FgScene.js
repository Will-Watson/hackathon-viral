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
        frameWidth: 230,
        frameHeight: 210,
      }
    );
    this.load.spritesheet(
      'idleSoldier',
      'assets/spritesheets/SoldierHandgunIdle.png',
      {
        frameWidth: 230,
        frameHeight: 210,
      }
    );
    // Preload Sounds
    // << LOAD SOUNDS HERE >>
  }

  create() {
    // Create game entities
    // << CREATE GAME ENTITIES HERE >>
    this.cursors = this.input.keyboard.createCursorKeys();
    this.legs = new Player(this, 20, 400, 'idleLegs').setScale(0.25);
    this.player = new Player(this, 20, 400, 'idleSoldier').setScale(0.25);
    // Create sounds
    // << CREATE SOUNDS HERE >>
    // Create collisions for all entities
    // << CREATE COLLISIONS HERE >>
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // << DO UPDATE LOGIC HERE >>
    this.player.update(this.cursors);
    this.legs.update(this.cursors);
  }
}
