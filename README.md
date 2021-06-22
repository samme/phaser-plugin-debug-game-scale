![](https://repository-images.githubusercontent.com/314664684/12043180-2b43-11eb-9a1c-0c838a9e3ff4)

Phaser 3 Debug Game Scale Plugin
================================

For your game scaling woes. It shows the [Scale Manager](https://photonstorm.github.io/phaser3-docs/Phaser.Scale.ScaleManager.html) state. [Demo](https://codepen.io/samme/full/mdEZOoP)

Browser / UMD
-------------

```js
/* global PhaserDebugGameScalePlugin */
new Phaser.Game({
    type: Phaser.CANVAS,
    plugins: {
        global: [
            { key: 'DebugGameScalePlugin', plugin: PhaserDebugGameScalePlugin, start: true }
        ]
    }
}
```

Module
------

```js
import DebugGameScalePlugin from 'phaser-plugin-debug-game-scale'

new Phaser.Game({
    type: Phaser.CANVAS,
    plugins: {
        global: [
            { key: 'DebugGameScalePlugin', plugin: DebugGameScalePlugin, start: true }
        ]
    }
}
```

Quick load
----------

```js
// preload()
this.load.plugin('PhaserDebugGameScalePlugin', 'https://cdn.jsdelivr.net/npm/phaser-plugin-debug-game-scale@3.0.0', true)
```

```js
// Console
game.scene.getScenes(true)[0].sys.load.plugin('PhaserDebugGameScalePlugin', 'https://cdn.jsdelivr.net/npm/phaser-plugin-debug-game-scale@3.0.0', true).start()
```