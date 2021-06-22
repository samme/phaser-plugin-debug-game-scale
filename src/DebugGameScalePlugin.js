import { aspectModeToString, rectToString, sizeToString, xyToString } from './util'

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
    const { gameContext: c } = this.game.renderer
    const cx = 0.5 * scale.width
    const cy = 0.5 * scale.height
    const w = 512
    const h = 128
    let x = cx - 0.5 * w
    let y = cy - 0.5 * h
    const dy = 16
    const sx = 1 / scale.displayScale.x
    const sy = 1 / scale.displayScale.y

    c.strokeStyle = 'white'
    c.beginPath()
    c.moveTo(0, 0)
    c.lineTo(scale.width, scale.height)
    c.stroke()
    c.beginPath()
    c.moveTo(0, scale.height)
    c.lineTo(scale.width, 0)
    c.stroke()
    c.fillStyle = 'rgba(0,0,0,0.8)'
    c.fillRect(x, y, w, h)
    c.fillStyle = 'white'
    c.font = 'caption'

    x += 8

    c.fillText(`${scale.width}×${scale.height} @ ${xyToString(sx, sy, 3)} mode=${aspectModeToString(scale.scaleMode)} zoom=${scale.zoom}`, x, (y += dy))
    c.fillText(`game: ${sizeToString(scale.gameSize)}`, x, (y += dy))
    c.fillText(`display: ${sizeToString(scale.displaySize)}`, x, (y += dy))
    c.fillText(`parent: ${sizeToString(scale.parentSize)} ${scale.parent}`, x, (y += dy))
    c.fillText(`canvas: ${rectToString(scale.canvasBounds)}`, x, (y += dy))
    c.fillText(`orientation: ${scale.orientation}`, x, (y += dy))
  }
}
