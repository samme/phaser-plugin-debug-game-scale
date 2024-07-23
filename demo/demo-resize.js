const scene = {
  preload: function () {
    this.load.image('bg', 'bg.png');
  },

  create: function () {
    this.add.image(0, 0, 'bg').setOrigin(0, 0);
  }
};

new Phaser.Game({
  type: Phaser.CANVAS,
  backgroundColor: 0x555555,
  plugins: {
    global: [
      { key: 'PhaserDebugGameScalePlugin', plugin: PhaserDebugGameScalePlugin, start: true, data: { x: 0, y: 0 } }
    ]
  },
  scale: {
    width: 800, height: 600,
    mode: Phaser.Scale.RESIZE,
    min: { width: 400, height: 300 },
    max: { width: 1600, height: 1200 },
  },
  scene: scene
});
