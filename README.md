![](https://repository-images.githubusercontent.com/314664684/cf308080-d4ba-11eb-8edd-6786eb2fc0d2)

Phaser 3 Debug Game Scale Plugin
================================

For your game scaling woes. It shows the [Scale Manager](https://newdocs.phaser.io/docs/3.80.1/Phaser.Scale.ScaleManager) state and logs [events](https://newdocs.phaser.io/docs/3.80.1/Phaser.Scale.Events). See [demos](https://codepen.io/collection/aMWjwK).

Browser / UMD
-------------

```html
<script src="https://cdn.jsdelivr.net/npm/phaser-plugin-debug-game-scale@4.1.0"></script>
```

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

You must use the `Phaser.CANVAS` renderer.

```js
// In preload():

this.load.plugin('PhaserDebugGameScalePlugin', 'https://cdn.jsdelivr.net/npm/phaser-plugin-debug-game-scale@4.1.0', true)
```

```js
// In console:

game.scene.getScenes(true)[0].sys.load.plugin('PhaserDebugGameScalePlugin', 'https://cdn.jsdelivr.net/npm/phaser-plugin-debug-game-scale@4.1.0', true).start()
```
