![](https://repository-images.githubusercontent.com/314664684/acc710d3-9255-4c73-9a6b-b2cf21483240)

Phaser 3 Debug Game Scale Plugin
================================

For your game scaling woes. It shows the [Scale Manager](https://docs.phaser.io/api-documentation/class/scale-scalemanager) state and logs [events](https://docs.phaser.io/api-documentation/event/scale-events). See [demos](https://codepen.io/collection/aMWjwK).

Quick load
----------

You must use `type: Phaser.CANVAS` in the game config.

### In `preload()`

```js
this.load.plugin('PhaserDebugGameScalePlugin', 'https://cdn.jsdelivr.net/npm/phaser-plugin-debug-game-scale@4.1.0', true)
```

### In console

```js
game.scene.getScenes(true)[0].sys.load.plugin('PhaserDebugGameScalePlugin', 'https://cdn.jsdelivr.net/npm/phaser-plugin-debug-game-scale@4.1.0', true).start()
```

Script tags / UMD
-----------------

```html
<!-- after phaser.js -->
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
