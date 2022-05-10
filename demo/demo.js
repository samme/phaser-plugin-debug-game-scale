var scene = {
  init: function () {
  },

  preload: function () {
    // this.load.image('bg')
  },

  create: function () {
    const { width, height } = this.scale
    const cx = 0.5 * width
    const cy = 0.5 * height
    const min = Math.min(width, height)
    const max = Math.max(width, height)

    this.add.circle(cx, cy, 0.5 * max, 0x0074D9)
    this.add.circle(cx, cy, 0.5 * min, 0x7FDBFF)

    // this.add.image(0, 0, 'bg').setOrigin(0, 0)

    this.input.on('pointerup', function () {
      this.scale.startFullscreen()
    }, this)
  }
}

// eslint-disable-next-line no-new
new Phaser.Game({
  type: Phaser.CANVAS,
  plugins: {
    global: [
      { key: 'PhaserDebugGameScalePlugin', plugin: PhaserDebugGameScalePlugin, start: true }
    ]
  },
  scale: {
    // width: 256, height: 192,
    // mode: Phaser.Scale.FIT,
    mode: Phaser.Scale.ENVELOP,
    // mode: Phaser.Scale.RESIZE,
    min: { width: 512, height: 384 },
    max: { width: 2048, height: 1536 },
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: scene
})
