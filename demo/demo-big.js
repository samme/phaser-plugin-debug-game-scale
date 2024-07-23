const scene = {
  init: function () {
    const cat = [
      '....443...443.',
      '...4433..4433.',
      '..44333.48333.',
      '88888888244444',
      '44444444433333',
      '44444444433333',
      '44044404433333',
      '44488844433333',
      '44400044433333',
      '44F202F4433333',
      '44202024433333',
      '44F222F4433333',
      '44444444433333',
      '4433...4433.33',
      '4433...4433.33'
    ];

    this.textures.generate('cat', { data: cat, pixelWidth: 10 });
  },

  create: function () {
    const { centerX, centerY, width, height } = this.cameras.default;

    this.add.image(centerX, centerY, 'cat');
    this.add.image(0, 0, 'cat').setOrigin(0, 0);
    this.add.image(width, height, 'cat').setOrigin(1, 1);

    this.input.on('pointerup', function () {
      this.scale.startFullscreen();
    }, this);
  }
};

new Phaser.Game({
  type: Phaser.CANVAS,
  backgroundColor: 0x555555,
  plugins: {
    global: [
      { key: 'PhaserDebugGameScalePlugin', plugin: PhaserDebugGameScalePlugin, start: true, data: { font: '24px system-ui', lineHeight: 32, width: 960, height: 480 } }
    ]
  },
  scale: {
    width: 1920, height: 1080,
    mode: Phaser.Scale.FIT,
    min: { width: 640, height: 360 },
    max: { width: 1920, height: 1080 },
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: scene
});
