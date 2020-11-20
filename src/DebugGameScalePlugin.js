import { aspectModeToString, rectToString, sizeToString } from './util'

const { POST_RENDER } = Phaser.Core.Events

export default class DebugGameScalePlugin extends Phaser.Plugins.BasePlugin {
  init (data) {
    if (!this.game.renderer.gameCanvas) {
      throw new Error('CANVAS renderer only')
    }

    console.info('device.fullscreen.available', this.game.device.fullscreen.available)
  }

  start () {
    this.game.events.on(POST_RENDER, this.render, this)
  }

  stop () {
    this.game.events.off(POST_RENDER, this.render, this)
  }

  render () {
    const { scale } = this.game
    const { gameContext } = this.game.renderer
    const x = 8
    let y = 4
    const dy = 16
    const sx = 1 / scale.displayScale.x
    const sy = 1 / scale.displayScale.y

    gameContext.fillStyle = 'rgba(0,0,0,0.8)'
    gameContext.fillRect(0, 0, 512, 128)
    gameContext.fillStyle = 'white'
    gameContext.font = 'caption'

    gameContext.fillText(`${scale.width} × ${scale.height} @ ${sx.toFixed(3)} × ${sy.toFixed(3)} mode=${aspectModeToString(scale.scaleMode)} resolution=${scale.resolution} zoom=${scale.zoom}`, x, (y += dy))
    gameContext.fillText(`game: ${sizeToString(scale.gameSize)}`, x, (y += dy))
    gameContext.fillText(`display: ${sizeToString(scale.displaySize)}`, x, (y += dy))
    gameContext.fillText(`parent: ${sizeToString(scale.parentSize)} ${scale.parent}`, x, (y += dy))
    gameContext.fillText(`canvas: ${rectToString(scale.canvasBounds)}`, x, (y += dy))
    gameContext.fillText(`orientation: ${scale.orientation}`, x, (y += dy))
  }
}
