Phaser 3 Debug Game Scale Plugin
================================

For your game scaling woes. It shows the Scale Manager state.

Use
---

### Browser / UMD

```js
/* global PhaserDebugGameScalePlugin */
new Phaser.Game({
    plugins: {
        global: [
            { key: 'PhaserDebugGameScalePlugin', plugin: PhaserDebugGameScalePlugin, start: true }
        ]
    }
}
```

### Module

```js
import DebugGameScalePlugin from 'phaser-plugin-debug-game-scale'

new Phaser.Game({
    plugins: {
        global: [
            { key: 'PhaserDebugGameScalePlugin', plugin: DebugGameScalePlugin, start: true }
        ]
    }
}
```