const { ScaleModes } = Phaser.Scale;
const { MAX_VALUE } = Number;

const aspectModeNames = {};

for (const name in ScaleModes) {
  aspectModeNames[ScaleModes[name]] = name;
}

const orientationNames = {
  [Phaser.Scale.Orientation.LANDSCAPE]: 'landscape',
  [Phaser.Scale.Orientation.PORTRAIT]: 'portrait'
};

const getSizeMaxString = function (size) {
  return (size.maxWidth < MAX_VALUE || size.maxHeight < MAX_VALUE) ? ` max=${size.maxWidth}×${size.maxHeight}` : ''
};

const getSizeMinString = function (size) {
  return (size.minWidth > 0 || size.minHeight > 0) ? ` min=${size.minWidth}×${size.minHeight}` : ''
};

const getSizeSnapString = function (size, precision) {
  const { x, y } = size.snapTo;

  return (x === 0 && y === 0) ? '' : ` snap=${vectorToString(size.snapTo, precision)}`
};

const aspectModeToString = function (mode) {
  return aspectModeNames[mode]
};

const vectorToString = function (vec, precision = 3) {
  return `(${vec.x.toFixed(precision)}, ${vec.y.toFixed(precision)})`
};

const xyToString = function (x, y, precision = 3) {
  return `(${x.toFixed(precision)}, ${y.toFixed(precision)})`
};

const sizeToString = function (size) {
  return `${size.width.toFixed(1)}×${size.height.toFixed(1)} [${size.aspectRatio.toFixed(3)}] mode=${aspectModeToString(size.aspectMode)}${getSizeMaxString(size)}${getSizeMinString(size)}${getSizeSnapString(size, 1)}${size._parent ? (` ← ${sizeToString(size._parent)}`) : ''}`
};

const rectToString = function (rect, precision = 1) {
  return `x=${rect.x.toFixed(precision)} y=${rect.y.toFixed(precision)} w=${rect.width.toFixed(precision)} h=${rect.height.toFixed(precision)}`
};

const logEnterFullscreen = function () {
  console.info('enter fullscreen');
};

const logFullscreenFailed = function () {
  console.info('fullscreen failed');
};

const logFullscreenUnsupported = function () {
  console.info('fullscreen unsupported');
};

const logLeaveFullscreen = function () {
  console.info('leave fullscreen');
};

const logOrientationChange = function (orientation) {
  console.info('orientation change', orientationNames[orientation]);
};

const logResize = function (game, base, display, prevWidth, prevHeight) {
  console.debug('resize', sizeToString(display));
};

const { POST_RENDER } = Phaser.Core.Events;

const { ENTER_FULLSCREEN, FULLSCREEN_FAILED, FULLSCREEN_UNSUPPORTED, LEAVE_FULLSCREEN, ORIENTATION_CHANGE, RESIZE } = Phaser.Scale.Events;

class DebugGameScalePlugin extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    this.x = null;
    this.y = null;
    this.width = 512;
    this.height = 128;
    this.font = '12px system-ui, sans-serif';
    this.lineHeight = 16;
    this.color = 'white';
    this.shadowBlur = 0;
    this.shadowOffsetX = 1;
    this.shadowOffsetY = 1;
    this.shadowColor = 'black';
  }

  init (data) {
    if (!this.game.renderer.gameCanvas) {
      throw new Error('CANVAS renderer only')
    }

    console.info('device.fullscreen.available', this.game.device.fullscreen.available);

    for (const dataKey in data) {
      if (this.hasOwnProperty(dataKey)) {
        this[dataKey] = data[dataKey];
      }
    }
  }

  start () {
    this.game.events.on(POST_RENDER, this.render, this);

    const { parent } = this.game.scale;

    if (parent) {
      parent.style.outline = 'thick solid rgba(255,0,0,0.5)';
    }

    this.game.scale
      .on(ENTER_FULLSCREEN, logEnterFullscreen)
      .on(FULLSCREEN_FAILED, logFullscreenFailed)
      .on(FULLSCREEN_UNSUPPORTED, logFullscreenUnsupported)
      .on(LEAVE_FULLSCREEN, logLeaveFullscreen)
      .on(ORIENTATION_CHANGE, logOrientationChange)
      .on(RESIZE, logResize);
  }

  stop () {
    this.game.events.off(POST_RENDER, this.render, this);

    const { parent } = this.game.scale;

    if (parent) {
      parent.style.outline = '';
    }

    this.game.scale
      .off(ENTER_FULLSCREEN, logEnterFullscreen)
      .off(FULLSCREEN_FAILED, logFullscreenFailed)
      .off(FULLSCREEN_UNSUPPORTED, logFullscreenUnsupported)
      .off(LEAVE_FULLSCREEN, logLeaveFullscreen)
      .off(ORIENTATION_CHANGE, logOrientationChange)
      .off(RESIZE, logResize);
  }

  render () {
    const { scale } = this.game;
    const { devicePixelRatio, screen, visualViewport } = window;
    const { gameContext: c } = this.game.renderer;
    const { activePointer } = this.game.input;
    const cx = 0.5 * scale.width;
    const cy = 0.5 * scale.height;
    const w = this.width;
    const h = this.height;
    const x = this.x ?? ~~Math.max(0, cx - 0.5 * w);
    let y = this.y ?? ~~Math.max(0, cy - 0.5 * h);
    const dy = this.lineHeight;
    const sx = 1 / scale.displayScale.x;
    const sy = 1 / scale.displayScale.y;

    c.save();

    c.strokeStyle = this.color;
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(scale.width, scale.height);
    c.stroke();
    c.beginPath();
    c.moveTo(0, scale.height);
    c.lineTo(scale.width, 0);
    c.stroke();

    strokeCircle(c, cx, cy, 0.5 * scale.width);
    strokeCircle(c, cx, cy, 0.5 * scale.height);

    c.fillStyle = this.color;
    c.font = this.font;
    c.textBaseline = 'top';
    c.shadowBlur = this.shadowBlur;
    c.shadowOffsetX = this.shadowOffsetX;
    c.shadowOffsetY = this.shadowOffsetY;
    c.shadowColor = this.shadowColor;

    c.fillText(`${scale.width}×${scale.height} @ ${xyToString(sx, sy, 3)} mode=${aspectModeToString(scale.scaleMode)} zoom=${scale.zoom}`, x, y);
    c.fillText(`game: ${sizeToString(scale.gameSize)}`, x, (y += dy));
    c.fillText(`display: ${sizeToString(scale.displaySize)}`, x, (y += dy));
    c.fillText(`parent: ${sizeToString(scale.parentSize)} ${scale.parent} isWindow=${scale.parentIsWindow}`, x, (y += dy));
    c.fillText(`canvas: ${rectToString(scale.canvasBounds)}`, x, (y += dy));
    c.fillText(`orientation: ${scale.orientation}`, x, (y += dy));
    
    if (screen) {
      c.fillText(`screen: ${screen.width}×${screen.height} [${(screen.width / screen.height).toFixed(3)}] DPR=${devicePixelRatio}`, x, (y += dy));
    }

    if (visualViewport) {
      const { offsetLeft, offsetTop, width, height, scale } = visualViewport;

      c.fillText(`viewport: oLeft=${offsetLeft} oTop=${offsetTop} width=${width}, height=${height} scale=${scale}`, x, (y += dy));
    }

    if (activePointer.active) {
      const {x, y} = activePointer;

      c.fillRect(x - 2, y - 2, 4, 4);
      c.fillText(vectorToString(activePointer, 3), x, y);
    }

    c.restore();
  }
}

function strokeCircle (c, x, y, r) {
  c.beginPath();
  c.arc(x, y, r, 0, 2 * Math.PI);
  c.stroke();
}

export { DebugGameScalePlugin as default };
