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
    this.hitCount = 0;
    this.scoreText;
    this.level = 1;
    this.levelText;
    this.bulletText;

    this.gameOverText;
    this.restartText;
    this.titleScreen;
  }

  preload() {
    // Preload Sprites

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
      bounceX: 1,
      bounceY: 1,
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
      this.spawnGreenVirus(2, 2, 50, 50);
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
    if (enemy.texture.key === 'greenVirus' && enemy.scale === 0.75) {
      let explosion = new Explosion(this, enemy.x, enemy.y).setScale(0.75);
      this.score += 10;
      enemy.destroy();
    } else if (enemy.texture.key === 'yellowVirus' && enemy.scale === 0.75) {
      let explosion = new Explosion(this, enemy.x, enemy.y).setScale(1);
      this.score += 20;
      enemy.destroy();
    } else if (enemy.texture.key === 'blueVirus' && enemy.scale === 1) {
      let explosion = new Explosion(this, enemy.x, enemy.y)
        .setScale(1.5)
        .setTint(0x000ff);
      this.score += 50;
      enemy.destroy();
    } else if (enemy.texture.key === 'greenVirus' && enemy.scale === 3) {
      this.hitCount += 1;
      if (this.hitCount === 150) {
        enemy.setTint(0xff7f7f);
      }
      if (this.hitCount === 250) {
        enemy.setTint(0xff0000);
      }
      if (this.hitCount === 300) {
        let explosion = new Explosion(this, enemy.x, enemy.y)
          .setScale(2.5)
          .setTint(0x0ff00);
        this.score += 1000;
        this.hitCount = 0;
        enemy.destroy();
      }
    } else if (enemy.texture.key === 'yellowVirus' && enemy.scale === 3) {
      this.hitCount += 1;
      if (this.hitCount === 300) {
        enemy.setTint(0xff7f7f);
      }
      if (this.hitCount === 500) {
        enemy.setTint(0xff0000);
      }
      if (this.hitCount === 600) {
        let explosion = new Explosion(this, enemy.x, enemy.y)
          .setScale(2.5)
          .setTint(0xffff00);
        this.score += 5000;
        this.hitCount = 0;
        enemy.destroy();
      }
    } else if (enemy.texture.key === 'blueVirus' && enemy.scale === 4) {
      this.hitCount += 1;
      if (this.hitCount === 500) {
        enemy.setTint(0xff7f7f);
      }
      if (this.hitCount === 900) {
        enemy.setTint(0xff0000);
      }
      if (this.hitCount === 1000) {
        let explosion = new Explosion(this, enemy.x, enemy.y)
          .setScale(8)
          .setTint(0x0000ff);
        this.score += 10000;
        this.hitCount = 0;
        enemy.destroy();
      }
    }
    this.scoreText.setText('Score: ' + this.score);

    if (
      this.greenVirus.countActive(true) === 0 &&
      this.yellowVirus.countActive(true) === 0 &&
      this.blueVirus.countActive(true) === 0
    ) {
      //level incrementation
      this.level += 1;
      this.levelText.setText('Level: ' + this.level);

      //level specs
      switch (this.level) {
        case 2:
          //return setTimeout(() => this.spawnGreenVirus(3, 3, 50, 50), 2000);
          return setTimeout(
            () => this.spawnBlueBossVirus(1, 1, 400, 400),
            2000
          );
        case 3:
          return setTimeout(() => this.spawnGreenVirus(4, 4, 50, 50), 2000);
        case 4:
          return setTimeout(() => this.spawnGreenVirus(5, 5, 50, 50), 2000);
        case 5:
          return setTimeout(() => this.spawnYellowVirus(2, 2, 75, 75), 2000);
        case 6:
          return setTimeout(() => {
            this.spawnGreenVirus(2, 2, 50, 50);
            this.spawnYellowVirus(1, 1, 75, 75);
          }, 2000);
        case 7:
          return setTimeout(() => {
            this.spawnGreenVirus(3, 3, 50, 50);
            this.spawnYellowVirus(2, 2, 75, 75);
          }, 2000);
        case 8:
          return setTimeout(() => {
            this.spawnGreenVirus(4, 4, 50, 50);
            this.spawnYellowVirus(2, 2, 75, 75);
          }, 2000);
        case 9:
          return setTimeout(() => {
            this.spawnGreenVirus(3, 3, 50, 50);
            this.spawnYellowVirus(3, 3, 75, 75);
          }, 2000);
        case 10:
          return setTimeout(() => {
            this.spawnGreenBossVirus(1, 1, 200, 200);
          }, 2000);
        case 11:
          return setTimeout(() => this.spawnBlueVirus(2, 2, 125, 125), 2000);
        case 12:
          return setTimeout(() => {
            this.spawnYellowVirus(1, 1, 75, 75);
            this.spawnBlueVirus(2, 2, 125, 125);
          }, 2000);
        case 13:
          return setTimeout(() => {
            this.spawnYellowVirus(2, 2, 75, 75);
            this.spawnBlueVirus(2, 2, 125, 125);
          }, 2000);
        case 14:
          return setTimeout(() => {
            this.spawnYellowVirus(3, 3, 75, 75);
            this.spawnBlueVirus(2, 2, 125, 125);
          }, 2000);
        case 15:
          return setTimeout(() => {
            this.spawnGreenBossVirus(1, 1, 150, 150);
            this.spawnGreenVirus(4, 4, 50, 50);
          }, 2000);
        case 16:
          return setTimeout(() => {
            this.spawnGreenVirus(3, 3, 50, 50);
            this.spawnYellowVirus(2, 2, 75, 75);
            this.spawnBlueVirus(1, 1, 125, 125);
          }, 2000);
        case 17:
          return setTimeout(() => {
            this.spawnGreenVirus(3, 3, 50, 50);
            this.spawnYellowVirus(2, 2, 75, 75);
            this.spawnBlueVirus(1, 1, 125, 125);
          }, 2000);
        case 18:
          return setTimeout(() => {
            this.spawnGreenVirus(3, 3, 50, 50);
            this.spawnYellowVirus(2, 2, 75, 75);
            this.spawnBlueVirus(2, 2, 125, 125);
          }, 2000);
        case 19:
          return setTimeout(() => {
            this.spawnGreenVirus(3, 3, 50, 50);
            this.spawnYellowVirus(2, 2, 75, 75);
            this.spawnBlueVirus(2, 2, 125, 125);
          }, 2000);
        case 20:
          return setTimeout(() => {
            this.spawnYellowBossVirus(1, 1, 300, 300);
          }, 2000);
        case 21:
          return setTimeout(() => this.spawnGreenVirus(8, 8, 75, 75), 2000);
        case 22:
          return setTimeout(() => this.spawnYellowVirus(6, 6, 100, 100), 2000);
        case 23:
          return setTimeout(() => this.spawnBlueVirus(5, 5, 150, 150), 2000);
        case 24:
          return setTimeout(() => {
            this.spawnGreenVirus(3, 3, 75, 75);
            this.spawnYellowVirus(2, 2, 100, 100);
            this.spawnBlueVirus(2, 2, 150, 150);
          }, 2000);
        case 25:
          return setTimeout(() => {
            this.spawnYellowBossVirus(1, 1, 200, 200);
            this.spawnYellowVirus(4, 4, 100, 100);
          }, 2000);
        case 26:
          return setTimeout(() => {
            this.spawnGreenVirus(4, 4, 75, 75);
            this.spawnYellowVirus(2, 2, 100, 100);
            this.spawnBlueVirus(2, 2, 150, 150);
          }, 2000);
        case 27:
          return setTimeout(() => {
            this.spawnGreenVirus(3, 3, 75, 75);
            this.spawnYellowVirus(2, 2, 100, 100);
            this.spawnBlueVirus(3, 3, 150, 150);
          }, 2000);
        case 28:
          return setTimeout(() => {
            this.spawnGreenVirus(1, 1, 75, 75);
            this.spawnYellowVirus(4, 4, 100, 100);
            this.spawnBlueVirus(3, 3, 150, 150);
          }, 2000);
        case 29:
          return setTimeout(() => {
            this.spawnYellowBossVirus(1, 1, 250, 250);
            this.spawnGreenBossVirus(2, 2, 150, 150);
          }, 2000);
        case 30:
          return setTimeout(
            () => this.spawnBlueBossVirus(1, 1, 400, 400),
            2000
          );
        default:
          setTimeout(() => this.spawnBlueBossVirus(1, 1, 450, 450), 2000);
      }
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
    this.gameOverText = this.add.text(200, 150, 'GAME OVER', {
      font: '75px Courier',
      fill: '#00ff00',
    });
    this.restartText = this.add.text(250, 300, 'Click to Restart', {
      font: '30px Courier',
      fill: '#00ff00',
    });
    this.titleScreen = this.add.text(290, 450, 'Title Screen', {
      font: '30px Courier',
      fill: '#00ff00',
    });

    this.titleScreen.setInteractive({ useHandCursor: true });
    this.titleScreen.on('pointerdown', () => {
      this.scene.switch('TitleScene');
    });

    this.input.once('pointerdown', () => {
      this.level = 1;
      this.score = 0;
      this.scene.restart();
    });
  }

  spawnGreenVirus(min, max, speedX, speedY) {
    let randomViruses = Phaser.Math.Between(min, max);

    for (let i = 0; i < randomViruses; i++) {
      this.greenVirus
        .create(Phaser.Math.Between(30, 770), 30, 'greenVirus')
        .setVelocity(speedX, speedY)
        .setScale(0.75)
        .setAngle(Phaser.Math.Between(-180, 180));
      this.greenVirus
        .create(770, Phaser.Math.Between(30, 570), 'greenVirus')
        .setVelocity(speedX, speedY)
        .setScale(0.75)
        .setAngle(Phaser.Math.Between(-180, 180));
      this.greenVirus
        .create(0, Phaser.Math.Between(30, 570), 'greenVirus')
        .setVelocity(speedX, speedY)
        .setScale(0.75)
        .setAngle(Phaser.Math.Between(-180, 180));
    }
  }
  spawnYellowVirus(min, max, speedX, speedY) {
    let randomViruses = Phaser.Math.Between(min, max);

    for (let i = 0; i < randomViruses; i++) {
      this.yellowVirus
        .create(Phaser.Math.Between(30, 770), 30, 'yellowVirus')
        .setVelocity(speedX, speedY)
        .setScale(0.75)
        .setAngle(Phaser.Math.Between(-180, 180));
      this.yellowVirus
        .create(770, Phaser.Math.Between(30, 570), 'yellowVirus')
        .setVelocity(speedX, speedY)
        .setScale(0.75)
        .setAngle(Phaser.Math.Between(-180, 180));
      this.yellowVirus
        .create(0, Phaser.Math.Between(30, 570), 'yellowVirus')
        .setVelocity(speedX, speedY)
        .setScale(0.75)
        .setAngle(Phaser.Math.Between(-180, 180));
    }
  }
  spawnBlueVirus(min, max, speedX, speedY) {
    let randomViruses = Phaser.Math.Between(min, max);

    for (let i = 0; i < randomViruses; i++) {
      this.blueVirus
        .create(Phaser.Math.Between(30, 770), 30, 'blueVirus')
        .setVelocity(speedX, speedY)
        .setScale(1)
        .setAngle(Phaser.Math.Between(-180, 180));
      this.blueVirus
        .create(770, Phaser.Math.Between(30, 570), 'blueVirus')
        .setVelocity(speedX, speedY)
        .setScale(1)
        .setAngle(Phaser.Math.Between(-180, 180));
      this.blueVirus
        .create(0, Phaser.Math.Between(30, 570), 'blueVirus')
        .setVelocity(speedX, speedY)
        .setScale(1)
        .setAngle(Phaser.Math.Between(-180, 180));
    }
  }
  spawnGreenBossVirus(min, max, speedX, speedY) {
    let randomViruses = Phaser.Math.Between(min, max);

    for (let i = 0; i < randomViruses; i++) {
      this.greenVirus
        .create(Phaser.Math.Between(30, 770), 30, 'greenVirus')
        .setVelocity(speedX, speedY)
        .setScale(3)
        .setAngle(Phaser.Math.Between(-180, 180));
    }
  }
  spawnYellowBossVirus(min, max, speedX, speedY) {
    let randomViruses = Phaser.Math.Between(min, max);

    for (let i = 0; i < randomViruses; i++) {
      this.yellowVirus
        .create(Phaser.Math.Between(30, 770), 30, 'yellowVirus')
        .setVelocity(speedX, speedY)
        .setScale(3)
        .setAngle(Phaser.Math.Between(-180, 180));
    }
  }
  spawnBlueBossVirus(min, max, speedX, speedY) {
    let randomViruses = Phaser.Math.Between(min, max);

    for (let i = 0; i < randomViruses; i++) {
      this.blueVirus
        .create(Phaser.Math.Between(30, 770), 30, 'blueVirus')
        .setVelocity(speedX, speedY)
        .setScale(4)
        .setAngle(Phaser.Math.Between(-180, 180));
    }
  }
}
