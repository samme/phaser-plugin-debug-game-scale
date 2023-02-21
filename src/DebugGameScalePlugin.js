import { aspectModeToString, rectToString, sizeToString, vectorToString, xyToString, logEnterFullscreen, logFullscreenFailed, logFullscreenUnsupported, logLeaveFullscreen, logOrientationChange, logResize } from './util'

const { POST_RENDER } = Phaser.Core.Events

const { ENTER_FULLSCREEN, FULLSCREEN_FAILED, FULLSCREEN_UNSUPPORTED, LEAVE_FULLSCREEN, ORIENTATION_CHANGE, RESIZE } = Phaser.Scale.Events

export default class DebugGameScalePlugin extends Phaser.Plugins.BasePlugin {
  init (data) {
    if (!this.game.renderer.gameCanvas) {
      throw new Error('CANVAS renderer only')
    }

    console.info('device.fullscreen.available', this.game.device.fullscreen.available)
  }

  start () {
    this.game.events.on(POST_RENDER, this.render, this)

    const { parent } = this.game.scale

    if (parent) {
      parent.style.outline = 'thick solid rgba(255,0,0,0.5)'
    }

    this.game.scale
      .on(ENTER_FULLSCREEN, logEnterFullscreen)
      .on(FULLSCREEN_FAILED, logFullscreenFailed)
      .on(FULLSCREEN_UNSUPPORTED, logFullscreenUnsupported)
      .on(LEAVE_FULLSCREEN, logLeaveFullscreen)
      .on(ORIENTATION_CHANGE, logOrientationChange)
      .on(RESIZE, logResize)
  }

  stop () {
    this.game.events.off(POST_RENDER, this.render, this)

    const { parent } = this.game.scale

    if (parent) {
      parent.style.outline = ''
    }

    this.game.scale
      .off(ENTER_FULLSCREEN, logEnterFullscreen)
      .off(FULLSCREEN_FAILED, logFullscreenFailed)
      .off(FULLSCREEN_UNSUPPORTED, logFullscreenUnsupported)
      .off(LEAVE_FULLSCREEN, logLeaveFullscreen)
      .off(ORIENTATION_CHANGE, logOrientationChange)
      .off(RESIZE, logResize)
  }

  render () {
    const { scale } = this.game
    const { devicePixelRatio, screen, visualViewport } = window
    const { gameContext: c } = this.game.renderer
    const cx = 0.5 * scale.width
    const cy = 0.5 * scale.height
    const w = 512
    const h = 128
    let x = ~~Math.max(0, cx - 0.5 * w)
    let y = ~~Math.max(0, cy - 0.5 * h)
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
    if (screen) {
      c.fillText(`screen: ${screen.width}×${screen.height} [${(screen.width / screen.height).toFixed(3)}] DPR=${devicePixelRatio}`, x, (y += dy))
    }
    if (visualViewport) {
      const { offsetLeft, offsetTop, width, height } = visualViewport;

      c.fillText(`visualViewport: ${offsetLeft}, ${offsetTop},  ${width}, ${height}`, x, (y += dy))
    }
  }
}
