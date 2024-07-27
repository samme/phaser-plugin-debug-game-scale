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
  backgroundColor: 0xB2DCEF,
  plugins: {
    global: [
      { key: 'PhaserDebugGameScalePlugin', plugin: PhaserDebugGameScalePlugin, start: true, data: { color: 'black', shadowColor: 'white', font: '24px ui-rounded', lineHeight: 32, width: 1024, height: 256 } }
    ]
  },
  scale: {
    mode: Phaser.Scale.FIT
  },
  scene: scene
});
