import Phaser from 'phaser';
import Player from '../entities/Player';
import Bullet from '../entities/Bullet';
import GreenVirus from '../entities/GreenVirus';
import YellowVirus from '../entities/YellowVirus';
import BlueVirus from '../entities/BlueVirus';
import Explosion from '../entities/Explosion';

export default class FgScene extends Phaser.Scene {
  constructor() {
    super('FgScene');
    this.fireBullet = this.fireBullet.bind(this);
    this.hit = this.hit.bind(this);
    this.score = 0;
    this.scoreText;
    this.level = 1;
    this.levelText;
    this.bulletText;
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
    this.load.spritesheet('explosion', 'assets/spritesheets/Explosion.png', {
      frameWidth: 96,
      frameHeight: 96,
    });
    this.load.image('bullet', 'assets/sprites/Bullet.png');
    this.load.image('glock', 'assets/sprites/Glock.png');
    this.load.image('greenVirus', 'assets/sprites/GreenVirus.png');
    this.load.image('yellowVirus', 'assets/sprites/yellowVirus.png');
    this.load.image('blueVirus', 'assets/sprites/blueVirus.png');
    // Preload Sounds
    // << LOAD SOUNDS HERE >>
  }

  create() {
    // Create game entities

    this.player = new Player(this, 400, 550, 'soldierHandgun').setScale(0.25);

    this.greenVirus = this.physics.add.group({
      classType: GreenVirus,
      bounceX: 1,
      bounceY: 1,
      collideWorldBounds: true,
    });
    this.yellowVirus = this.physics.add.group({
      classType: YellowVirus,
      bounceX: 1,
      bounceY: 1,
      collideWorldBounds: true,
    });
    this.blueVirus = this.physics.add.group({
      classType: BlueVirus,
      bounceX: 1.5,
      bounceY: 1.5,
      collideWorldBounds: true,
    });

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
    this.physics.add.overlap(
      this.bullets,
      this.yellowVirus,
      this.hit,
      null,
      this
    );
    this.physics.add.overlap(
      this.bullets,
      this.blueVirus,
      this.hit,
      null,
      this
    );

    // Create sounds
    // << CREATE SOUNDS HERE >>
    // Create collisions for all entities
    // << CREATE COLLISIONS HERE >>
    this.physics.add.collider(this.greenVirus, this.greenVirus);
    this.physics.add.collider(this.yellowVirus, this.yellowVirus);
    this.physics.add.collider(this.blueVirus, this.blueVirus);

    this.physics.add.collider(
      this.player,
      this.greenVirus,
      this.hitVirus,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.yellowVirus,
      this.hitVirus,
      null,
      this
    );
    this.physics.add.collider(
      this.player,
      this.blueVirus,
      this.hitVirus,
      null,
      this
    );
    //spawning initial viruses
    setTimeout(() => {
      this.spawnGreenVirus(5, 8);
    }, 3000);

    //scoreboard
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      font: '32px Courier',
      fill: '#00ff00',
    });
    this.levelText = this.add.text(16, 50, 'Level: 1', {
      font: '32px Courier',
      fill: '#00ff00',
    });
    this.add.image(30, 580, 'glock').setScale(0.035);
    this.bulletText = this.add.text(55, 565, `12/12`, {
      font: '24px Courier',
      fill: '#000',
    });
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
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 11,
      }),
      frameRate: 10,
    });
  }

  update(time, delta) {
    this.player.update(time, this.player, this.cursors, this.fireBullet);
    this.bulletText.setText(this.player.remainingBullets + '/12');
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
    enemy.destroy();

    if (enemy.texture.key === 'greenVirus') {
      let explosion = new Explosion(this, enemy.x, enemy.y).setScale(0.75);
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);
      this.data.values.Score += 10;
    } else if (enemy.texture.key === 'yellowVirus') {
      let explosion = new Explosion(this, enemy.x, enemy.y).setScale(1);
      this.score += 20;
      this.scoreText.setText('Score: ' + this.score);
    } else if (enemy.texture.key === 'blueVirus') {
      let explosion = new Explosion(this, enemy.x, enemy.y)
        .setScale(1.5)
        .setTint(0x000ff);
      this.score += 50;
      this.scoreText.setText('Score: ' + this.score);
    }

    if (
      this.greenVirus.countActive(true) === 0 &&
      this.yellowVirus.countActive(true) === 0 &&
      this.blueVirus.countActive(true) === 0
    ) {
      this.level += 1;
      this.levelText.setText('Level: ' + this.level);
      setTimeout(() => {
        this.spawnGreenVirus(5, 8);
        this.spawnYellowVirus(1, 3);
        this.spawnBlueVirus(1, 1);
      }, 3000);
    }
  }

  hitVirus(player, virus) {
    this.physics.pause();
    virus.setTint(0xff0000);
    player.disableBody(true, true);
    let explosion = new Explosion(this, player.x, player.y)
      .setScale(5)
      .setTint(0x9f329f);

    this.gameOver = true;
  }

  spawnGreenVirus(min, max) {
    let randomViruses = Phaser.Math.Between(min, max);

    for (let i = 0; i < randomViruses; i++) {
      this.greenVirus
        .create(Phaser.Math.Between(30, 770), 30, 'greenVirus')
        .setVelocity(
          Phaser.Math.Between(-100, 100),
          Phaser.Math.Between(-100, 100)
        )
        .setScale(0.75)
        .setAngle(Phaser.Math.Between(-180, 180));
      this.greenVirus
        .create(770, Phaser.Math.Between(30, 570), 'greenVirus')
        .setVelocity(
          Phaser.Math.Between(-100, 100),
          Phaser.Math.Between(-100, 100)
        )
        .setScale(0.75)
        .setAngle(Phaser.Math.Between(-180, 180));
      this.greenVirus
        .create(0, Phaser.Math.Between(30, 570), 'greenVirus')
        .setVelocity(
          Phaser.Math.Between(-100, 100),
          Phaser.Math.Between(-100, 100)
        )
        .setScale(0.75)
        .setAngle(Phaser.Math.Between(-180, 180));
    }
  }
  spawnYellowVirus(min, max) {
    let randomViruses = Phaser.Math.Between(min, max);

    for (let i = 0; i < randomViruses; i++) {
      this.yellowVirus
        .create(Phaser.Math.Between(30, 770), 30, 'yellowVirus')
        .setVelocity(
          Phaser.Math.Between(100, 200),
          Phaser.Math.Between(100, 200)
        )
        .setScale(0.75)
        .setAngle(Phaser.Math.Between(-180, 180));
      this.yellowVirus
        .create(770, Phaser.Math.Between(30, 570), 'yellowVirus')
        .setVelocity(
          Phaser.Math.Between(100, 200),
          Phaser.Math.Between(100, 200)
        )
        .setScale(0.75)
        .setAngle(Phaser.Math.Between(-180, 180));
      this.yellowVirus
        .create(0, Phaser.Math.Between(30, 570), 'yellowVirus')
        .setVelocity(
          Phaser.Math.Between(100, 200),
          Phaser.Math.Between(100, 200)
        )
        .setScale(0.75)
        .setAngle(Phaser.Math.Between(-180, 180));
    }
  }
  spawnBlueVirus(min, max) {
    let randomViruses = Phaser.Math.Between(min, max);

    for (let i = 0; i < randomViruses; i++) {
      this.blueVirus
        .create(Phaser.Math.Between(30, 770), 30, 'blueVirus')
        .setVelocity(Phaser.Math.Between(0, 50), Phaser.Math.Between(0, 50))
        .setScale(1)
        .setAngle(Phaser.Math.Between(-180, 180));
      this.blueVirus
        .create(770, Phaser.Math.Between(30, 570), 'blueVirus')
        .setVelocity(Phaser.Math.Between(0, 50), Phaser.Math.Between(0, 50))
        .setScale(1)
        .setAngle(Phaser.Math.Between(-180, 180));
      this.blueVirus
        .create(0, Phaser.Math.Between(30, 570), 'blueVirus')
        .setVelocity(Phaser.Math.Between(0, 50), Phaser.Math.Between(0, 50))
        .setScale(1)
        .setAngle(Phaser.Math.Between(-180, 180));
    }
  }
}
