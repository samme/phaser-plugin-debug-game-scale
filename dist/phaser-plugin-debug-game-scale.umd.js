(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.PhaserDebugGameScalePlugin = factory());
}(this, (function () { 'use strict';

  var ref = Phaser.Scale;
  var ScaleModes = ref.ScaleModes;

  var aspectModeNames = {};

  for (var name in ScaleModes) {
    aspectModeNames[ScaleModes[name]] = name;
  }

  var aspectModeToString = function (mode) {
    return aspectModeNames[mode]
  };

  var sizeToString = function (size) {
    return ((size.width.toFixed(1)) + " × " + (size.height.toFixed(1)) + " [" + (size.aspectRatio.toFixed(3)) + "] mode=" + (aspectModeToString(size.aspectMode)) + (size._parent ? (' ← ' + sizeToString(size._parent)) : ''))
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
      gameContext.fillRect(0, 0, 512, 128);
      gameContext.fillStyle = 'white';
      gameContext.font = 'caption';

      gameContext.fillText(((scale.width) + " × " + (scale.height) + " @ " + (sx.toFixed(3)) + " × " + (sy.toFixed(3)) + " mode=" + (aspectModeToString(scale.scaleMode)) + " resolution=" + (scale.resolution) + " zoom=" + (scale.zoom)), x, (y += dy));
      gameContext.fillText(("game: " + (sizeToString(scale.gameSize))), x, (y += dy));
      gameContext.fillText(("display: " + (sizeToString(scale.displaySize))), x, (y += dy));
      gameContext.fillText(("parent: " + (sizeToString(scale.parentSize)) + " " + (scale.parent)), x, (y += dy));
      gameContext.fillText(("canvas: " + (rectToString(scale.canvasBounds))), x, (y += dy));
      gameContext.fillText(("orientation: " + (scale.orientation)), x, (y += dy));
    };

    return DebugGameScalePlugin;
  }(Phaser.Plugins.BasePlugin));

  return DebugGameScalePlugin;

})));
