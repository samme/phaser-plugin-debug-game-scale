const { assert } = chai

mocha.setup('bdd')

describe('Phaser', function () {
  it('is an object', function () {
    assert.isObject(Phaser)
  })

  it('is v3.80.1', function () {
    assert.propertyVal(Phaser, 'VERSION', '3.80.1')
  })
})

describe('PhaserDebugGameScalePlugin', function () {
  it('is a function', function () {
    assert.isFunction(PhaserDebugGameScalePlugin)
  })
})

describe('Plugin added to game with { start: true }', function () {
  let game

  beforeEach(function (done) {
    console.debug('new Phaser.Game')

    game = new Phaser.Game({
      type: Phaser.CANVAS,
      canvasStyle: 'display: none',
      plugins: {
        global: [
          { key: 'PhaserDebugGameScalePlugin', plugin: PhaserDebugGameScalePlugin, start: true }
        ]
      },
      callbacks: {
        postBoot: function () {
          console.debug('Game booted')
          done()
        }
      }
    })
  })

  afterEach(function (done) {
    const entry = game.plugins.getEntry('PhaserDebugGameScalePlugin')

    if (entry) {
      const { plugin } = entry

      if (plugin.game) {
        console.debug('Stop plugin from manager')
        game.plugins.stop('PhaserDebugGameScalePlugin')
      }

      console.debug('Destroy plugin')
      plugin.destroy()

      assert.isNull(plugin.game, 'Plugin `game` is null (after destroy)')
    }

    console.debug('Remove global plugin from manager')
    game.plugins.removeGlobalPlugin('PhaserDebugGameScalePlugin')
    assert.isUndefined(game.plugins.getEntry('PhaserDebugGameScalePlugin'), 'Plugin entry is undefined (after removing)')

    console.debug('Destroy game')

    game.events.once('destroy', done)
    game.destroy(true)
    game = null
  })

  it('is active', function () {
    assert.isTrue(game.plugins.isActive('PhaserDebugGameScalePlugin'))
  })

  it('is inactive after stopping', function () {
    game.plugins.stop('PhaserDebugGameScalePlugin')
    assert.isFalse(game.plugins.isActive('PhaserDebugGameScalePlugin'))
  })

  it('is undefined after removing (but not destroyed)', function () {
    game.plugins.removeGlobalPlugin('PhaserDebugGameScalePlugin')
    assert.isUndefined(game.plugins.getEntry('PhaserDebugGameScalePlugin'))
  })

  it('is destroyed after destroying (but not removed)', function () {
    const { plugin } = game.plugins.getEntry('PhaserDebugGameScalePlugin')

    plugin.destroy()

    assert.isNull(plugin.game)
  })

  it('has the expected properties (x, y, width, height, font, lineHeight, color, shadowColor)', function () {
    const { plugin } = game.plugins.getEntry('PhaserDebugGameScalePlugin')

    assert.isNull(plugin.x)
    assert.isNull(plugin.y)
    assert.strictEqual(plugin.width, 512)
    assert.strictEqual(plugin.height, 128)
    assert.strictEqual(plugin.font, '12px system-ui, sans-serif')
    assert.strictEqual(plugin.lineHeight, 16)
    assert.strictEqual(plugin.color, 'white')
    assert.strictEqual(plugin.shadowColor, 'black')

  })
})

describe('Plugin added to game with { data, start: true }', function () {
  let game

  beforeEach(function (done) {
    console.debug('new Phaser.Game')

    game = new Phaser.Game({
      type: Phaser.CANVAS,
      canvasStyle: 'display: none',
      plugins: {
        global: [
          { key: 'PhaserDebugGameScalePlugin', plugin: PhaserDebugGameScalePlugin, start: true,
            data: { x: 1, y: 2, width: 480, height: 320, font: '12px monospace', lineHeight: 18, color: 'ghostwhite', shadowColor: 'grey' } }
        ]
      },
      callbacks: {
        postBoot: function () {
          console.debug('Game booted')
          done()
        }
      }
    })
  })

  afterEach(function (done) {
    const entry = game.plugins.getEntry('PhaserDebugGameScalePlugin')

    if (entry) {
      const { plugin } = entry

      if (plugin.game) {
        console.debug('Stop plugin from manager')
        game.plugins.stop('PhaserDebugGameScalePlugin')
      }

      console.debug('Destroy plugin')
      plugin.destroy()

      assert.isNull(plugin.game, 'Plugin `game` is null (after destroy)')
    }

    console.debug('Remove global plugin from manager')
    game.plugins.removeGlobalPlugin('PhaserDebugGameScalePlugin')
    assert.isUndefined(game.plugins.getEntry('PhaserDebugGameScalePlugin'), 'Plugin entry is undefined (after removing)')

    console.debug('Destroy game')

    game.events.once('destroy', done)
    game.destroy(true)
    game = null
  })

  it('has the expected properties (x, y, width, height, font, lineHeight, color, shadowColor)', function () {
    const { plugin } = game.plugins.getEntry('PhaserDebugGameScalePlugin')

    assert.strictEqual(plugin.x, 1)
    assert.strictEqual(plugin.y, 2)
    assert.strictEqual(plugin.width, 480)
    assert.strictEqual(plugin.height, 320)
    assert.strictEqual(plugin.font, '12px monospace')
    assert.strictEqual(plugin.lineHeight, 18)
    assert.strictEqual(plugin.color, 'ghostwhite')
    assert.strictEqual(plugin.shadowColor, 'grey')
  })
})

mocha.checkLeaks()
mocha.globals(['Phaser'])
mocha.run()
