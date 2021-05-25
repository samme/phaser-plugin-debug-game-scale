var ref = Phaser.Scale;
var ScaleModes = ref.ScaleModes;
var MAX_VALUE = Number.MAX_VALUE;

var aspectModeNames = {};

for (var name in ScaleModes) {
  aspectModeNames[ScaleModes[name]] = name;
}

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

var ref$1 = Phaser.Core.Events;
var POST_RENDER = ref$1.POST_RENDER;

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
  };

  DebugGameScalePlugin.prototype.stop = function stop () {
    this.game.events.off(POST_RENDER, this.render, this);
  };

  DebugGameScalePlugin.prototype.render = function render () {
    var ref = this.game;
    var scale = ref.scale;
    var ref$1 = this.game.renderer;
    var gameContext = ref$1.gameContext;
    var x = 8;
    var y = 4;
    var dy = 16;
    var sx = 1 / scale.displayScale.x;
    var sy = 1 / scale.displayScale.y;

    gameContext.fillStyle = 'rgba(0,0,0,0.8)';
    gameContext.fillRect(0, 0, 768, 128);
    gameContext.fillStyle = 'white';
    gameContext.font = 'caption';

    gameContext.fillText(((scale.width) + "×" + (scale.height) + " @ " + (xyToString(sx, sy, 3)) + " mode=" + (aspectModeToString(scale.scaleMode)) + " zoom=" + (scale.zoom)), x, (y += dy));
    gameContext.fillText(("game: " + (sizeToString(scale.gameSize))), x, (y += dy));
    gameContext.fillText(("display: " + (sizeToString(scale.displaySize))), x, (y += dy));
    gameContext.fillText(("parent: " + (sizeToString(scale.parentSize)) + " " + (scale.parent)), x, (y += dy));
    gameContext.fillText(("canvas: " + (rectToString(scale.canvasBounds))), x, (y += dy));
    gameContext.fillText(("orientation: " + (scale.orientation)), x, (y += dy));
  };

  return DebugGameScalePlugin;
}(Phaser.Plugins.BasePlugin));

export default DebugGameScalePlugin;
