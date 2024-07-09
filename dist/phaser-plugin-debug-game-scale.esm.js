var ref = Phaser.Scale;
var ScaleModes = ref.ScaleModes;
var MAX_VALUE = Number.MAX_VALUE;

var aspectModeNames = {};

for (var name in ScaleModes) {
  aspectModeNames[ScaleModes[name]] = name;
}

var orientationNames = {};
orientationNames[Phaser.Scale.Orientation.LANDSCAPE] = 'landscape';
orientationNames[Phaser.Scale.Orientation.PORTRAIT] = 'portrait';

var getSizeMaxString = function (size) {
  return (size.maxWidth < MAX_VALUE || size.maxHeight < MAX_VALUE) ? (" max=" + (size.maxWidth) + "×" + (size.maxHeight)) : ''
};

var getSizeMinString = function (size) {
  return (size.minWidth > 0 || size.minHeight > 0) ? (" min=" + (size.minWidth) + "×" + (size.minHeight)) : ''
};

var getSizeSnapString = function (size, precision) {
  var ref = size.snapTo;
  var x = ref.x;
  var y = ref.y;

  return (x === 0 && y === 0) ? '' : (" snap=" + (vectorToString(size.snapTo, precision)))
};

var aspectModeToString = function (mode) {
  return aspectModeNames[mode]
};

var vectorToString = function (vec, precision) {
  if ( precision === void 0 ) precision = 3;

  return ("(" + (vec.x.toFixed(precision)) + ", " + (vec.y.toFixed(precision)) + ")")
};

var xyToString = function (x, y, precision) {
  if ( precision === void 0 ) precision = 3;

  return ("(" + (x.toFixed(precision)) + ", " + (y.toFixed(precision)) + ")")
};

var sizeToString = function (size) {
  return ((size.width.toFixed(1)) + "×" + (size.height.toFixed(1)) + " [" + (size.aspectRatio.toFixed(3)) + "] mode=" + (aspectModeToString(size.aspectMode)) + (getSizeMaxString(size)) + (getSizeMinString(size)) + (getSizeSnapString(size, 1)) + (size._parent ? (' ← ' + sizeToString(size._parent)) : ''))
};

var rectToString = function (rect, precision) {
  if ( precision === void 0 ) precision = 1;

  return ("x=" + (rect.x.toFixed(precision)) + " y=" + (rect.y.toFixed(precision)) + " w=" + (rect.width.toFixed(precision)) + " h=" + (rect.height.toFixed(precision)))
};

var logEnterFullscreen = function () {
  console.info('enter fullscreen');
};

var logFullscreenFailed = function () {
  console.info('fullscreen failed');
};

var logFullscreenUnsupported = function () {
  console.info('fullscreen unsupported');
};

var logLeaveFullscreen = function () {
  console.info('leave fullscreen');
};

var logOrientationChange = function (orientation) {
  console.info('orientation change', orientationNames[orientation]);
};

var logResize = function (game, base, display, prevWidth, prevHeight) {
  console.debug('resize', sizeToString(display));
};

var ref$1 = Phaser.Core.Events;
var POST_RENDER = ref$1.POST_RENDER;

var ref$1$1 = Phaser.Scale.Events;
var ENTER_FULLSCREEN = ref$1$1.ENTER_FULLSCREEN;
var FULLSCREEN_FAILED = ref$1$1.FULLSCREEN_FAILED;
var FULLSCREEN_UNSUPPORTED = ref$1$1.FULLSCREEN_UNSUPPORTED;
var LEAVE_FULLSCREEN = ref$1$1.LEAVE_FULLSCREEN;
var ORIENTATION_CHANGE = ref$1$1.ORIENTATION_CHANGE;
var RESIZE = ref$1$1.RESIZE;

var DebugGameScalePlugin = /*@__PURE__*/(function (superclass) {
  function DebugGameScalePlugin () {
    superclass.apply(this, arguments);
  }

  if ( superclass ) DebugGameScalePlugin.__proto__ = superclass;
  DebugGameScalePlugin.prototype = Object.create( superclass && superclass.prototype );
  DebugGameScalePlugin.prototype.constructor = DebugGameScalePlugin;

  DebugGameScalePlugin.prototype.init = function init (data) {
    if (!this.game.renderer.gameCanvas) {
      throw new Error('CANVAS renderer only')
    }

    console.info('device.fullscreen.available', this.game.device.fullscreen.available);
  };

  DebugGameScalePlugin.prototype.start = function start () {
    this.game.events.on(POST_RENDER, this.render, this);

    var ref = this.game.scale;
    var parent = ref.parent;

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
  };

  DebugGameScalePlugin.prototype.stop = function stop () {
    this.game.events.off(POST_RENDER, this.render, this);

    var ref = this.game.scale;
    var parent = ref.parent;

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
  };

  DebugGameScalePlugin.prototype.render = function render () {
    var ref = this.game;
    var scale = ref.scale;
    var devicePixelRatio = window.devicePixelRatio;
    var screen = window.screen;
    var visualViewport = window.visualViewport;
    var ref$1 = this.game.renderer;
    var c = ref$1.gameContext;
    var cx = 0.5 * scale.width;
    var cy = 0.5 * scale.height;
    var w = 512;
    var h = 128;
    var x = ~~Math.max(0, cx - 0.5 * w);
    var y = ~~Math.max(0, cy - 0.5 * h);
    var dy = 15;
    var sx = 1 / scale.displayScale.x;
    var sy = 1 / scale.displayScale.y;

    c.strokeStyle = 'white';
    c.beginPath();
    c.moveTo(0, 0);
    c.lineTo(scale.width, scale.height);
    c.stroke();
    c.beginPath();
    c.moveTo(0, scale.height);
    c.lineTo(scale.width, 0);
    c.stroke();
    c.fillStyle = 'rgba(0,0,0,0.8)';
    c.fillRect(x, y, w, h);
    c.fillStyle = 'white';
    c.font = 'caption';

    x += 8;

    c.fillText(((scale.width) + "×" + (scale.height) + " @ " + (xyToString(sx, sy, 3)) + " mode=" + (aspectModeToString(scale.scaleMode)) + " zoom=" + (scale.zoom)), x, (y += dy));
    c.fillText(("game: " + (sizeToString(scale.gameSize))), x, (y += dy));
    c.fillText(("display: " + (sizeToString(scale.displaySize))), x, (y += dy));
    c.fillText(("parent: " + (sizeToString(scale.parentSize)) + " " + (scale.parent)), x, (y += dy));
    c.fillText(("canvas: " + (rectToString(scale.canvasBounds))), x, (y += dy));
    c.fillText(("orientation: " + (scale.orientation)), x, (y += dy));
    if (screen) {
      c.fillText(("screen: " + (screen.width) + "×" + (screen.height) + " [" + ((screen.width / screen.height).toFixed(3)) + "] DPR=" + devicePixelRatio), x, (y += dy));
    }
    if (visualViewport) {
      var offsetLeft = visualViewport.offsetLeft;
      var offsetTop = visualViewport.offsetTop;
      var width = visualViewport.width;
      var height = visualViewport.height;
      var scale$1 = visualViewport.scale;

      c.fillText(("visualViewport: offsetLeft=" + offsetLeft + " offsetTop=" + offsetTop + " width=" + width + ", height=" + height + " scale=" + scale$1), x, (y += dy));
    }
  };

  return DebugGameScalePlugin;
}(Phaser.Plugins.BasePlugin));

export default DebugGameScalePlugin;
