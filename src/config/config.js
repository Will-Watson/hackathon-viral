export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  render: {
    pixelArt: true,
  },

  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};
