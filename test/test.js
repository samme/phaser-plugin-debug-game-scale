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
})

mocha.checkLeaks()
mocha.globals(['Phaser'])
mocha.run()
