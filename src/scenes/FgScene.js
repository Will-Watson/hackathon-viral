import Phaser from 'phaser';
import Player from '../entities/Player';
import Bullet from '../entities/Bullet';
import GreenVirus from '../entities/GreenVirus';

export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene');
    this.fireBullet = this.fireBullet.bind(this);
    this.hit = this.hit.bind(this);
  }

  preload() {
    // Preload Sprites
    // << LOAD SPRITES HERE >>

    this.load.spritesheet(
      'soldierHandgun',
      'assets/spritesheets/SoldierHandgun.png',
      {
        frameWidth: 253,
        frameHeight: 216,
      }
    );
    this.load.image('bullet', 'assets/sprites/Bullet.png');
    this.load.image('greenVirus', 'assets/sprites/GreenVirus.png');
    // Preload Sounds
    // << LOAD SOUNDS HERE >>
  }

  create() {
    // Create game entities
    // << CREATE GAME ENTITIES HERE >>

    this.player = new Player(this, 400, 550, 'soldierHandgun').setScale(0.25);

    this.greenVirus = this.physics.add.group({
      bounceX: 1,
      bounceY: 1,
      collideWorldBounds: true,
    });

    let randomViruses = Phaser.Math.Between(5, 8);

    for (let i = 0; i < randomViruses; i++) {
      this.greenVirus
        .create(Phaser.Math.Between(30, 770), 30, 'greenVirus')
        .setVelocity(
          Phaser.Math.Between(-100, 100),
          Phaser.Math.Between(-100, 100)
        )
        .setScale(0.75);
      this.greenVirus
        .create(770, Phaser.Math.Between(30, 570), 'greenVirus')
        .setVelocity(
          Phaser.Math.Between(-100, 100),
          Phaser.Math.Between(-100, 100)
        )
        .setScale(0.75);
      this.greenVirus
        .create(0, Phaser.Math.Between(30, 570), 'greenVirus')
        .setVelocity(
          Phaser.Math.Between(-100, 100),
          Phaser.Math.Between(-100, 100)
        )
        .setScale(0.75);
    }

    this.bullets = this.physics.add.group({
      classType: Bullet,
      runChildUpdate: true,
      allowGravity: false,
      maxSize: 40,
    });

    this.cursors = this.input.keyboard.createCursorKeys();
    this.createAnimations();

    this.physics.add.overlap(
      this.bullets,
      this.greenVirus,
      this.hit,
      null,
      this
    );
    // Create sounds
    // << CREATE SOUNDS HERE >>
    // Create collisions for all entities
    // << CREATE COLLISIONS HERE >>
    this.physics.add.collider(this.greenVirus, this.greenVirus);

    this.physics.add.collider(
      this.player,
      this.greenVirus,
      this.hitVirus,
      null,
      this
    );
  }

  createAnimations() {
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('soldierHandgun', {
        end: 19,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('soldierHandgun', {
        start: 20,
        end: 39,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'shoot',
      frames: this.anims.generateFrameNumbers('soldierHandgun', {
        start: 55,
        end: 58,
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'reload',
      frames: this.anims.generateFrameNumbers('soldierHandgun', {
        start: 42,
        end: 54,
      }),
      frameRate: 10,
    });
  }

  // time: total time elapsed (ms)
  // delta: time elapsed (ms) since last update() call. 16.666 ms @ 60fps
  update(time, delta) {
    // << DO UPDATE LOGIC HERE >>

    this.player.update(time, this.player, this.cursors, this.fireBullet);

    // Phaser.Actions.RotateAround(
    //   this.greenVirus.getChildren(),
    //   { x: 400, y: 300 },
    //   0.01
    // );
  }

  fireBullet(x, y, angle) {
    let bulletX;
    let bulletY;
    if (this.player.angle === 0) {
      bulletX = this.player.x + 35;
      bulletY = this.player.y + 17;
    } else if (this.player.angle === 90) {
      bulletX = this.player.x - 17;
      bulletY = this.player.y + 35;
    } else if (this.player.angle === -180) {
      bulletX = this.player.x - 35;
      bulletY = this.player.y - 17;
    } else if (this.player.angle === -90) {
      bulletX = this.player.x + 17;
      bulletY = this.player.y - 35;
    }

    let bullet = this.bullets.getFirstDead();

    if (!bullet) {
      bullet = new Bullet(
        this,
        bulletX,
        bulletY,
        'bullet',
        this.player.angle
      ).setScale(0.03);
      this.bullets.add(bullet);
    }

    bullet.reset(bulletX, bulletY, this.player.angle);
  }

  hit(bullet, enemy) {
    enemy.disableBody(true, true);
  }

  hitVirus(player, virus) {
    this.physics.pause();

    player.setTint(0xff0000);
    virus.setTint(0xff0000);
    this.gameOver = true;
  }
}
