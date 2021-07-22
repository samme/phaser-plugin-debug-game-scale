const { ScaleModes } = Phaser.Scale
const { MAX_VALUE } = Number

const aspectModeNames = {}

for (const name in ScaleModes) {
  aspectModeNames[ScaleModes[name]] = name
}

const orientationNames = {
  [Phaser.Scale.Orientation.LANDSCAPE]: 'landscape',
  [Phaser.Scale.Orientation.PORTRAIT]: 'portrait'
}

const getSizeMaxString = function (size) {
  return (size.maxWidth < MAX_VALUE || size.maxHeight < MAX_VALUE) ? ` max=${size.maxWidth}×${size.maxHeight}` : ''
}

const getSizeMinString = function (size) {
  return (size.minWidth > 0 || size.minHeight > 0) ? ` min=${size.minWidth}×${size.minHeight}` : ''
}

const getSizeSnapString = function (size, precision) {
  const { x, y } = size.snapTo

  return (x === 0 && y === 0) ? '' : ` snap=${vectorToString(size.snapTo, precision)}`
}

export const aspectModeToString = function (mode) {
  return aspectModeNames[mode]
}

export const vectorToString = function (vec, precision = 3) {
  return `(${vec.x.toFixed(precision)}, ${vec.y.toFixed(precision)})`
}

export const xyToString = function (x, y, precision = 3) {
  return `(${x.toFixed(precision)}, ${y.toFixed(precision)})`
}

export const sizeToString = function (size) {
  return `${size.width.toFixed(1)}×${size.height.toFixed(1)} [${size.aspectRatio.toFixed(3)}] mode=${aspectModeToString(size.aspectMode)}${getSizeMaxString(size)}${getSizeMinString(size)}${getSizeSnapString(size, 1)}${size._parent ? (' ← ' + sizeToString(size._parent)) : ''}`
}

export const rectToString = function (rect, precision = 1) {
  return `x=${rect.x.toFixed(precision)} y=${rect.y.toFixed(precision)} w=${rect.width.toFixed(precision)} h=${rect.height.toFixed(precision)}`
}

export const logEnterFullscreen = function () {
  console.info('enter fullscreen')
}

export const logFullscreenFailed = function () {
  console.info('fullscreen failed')
}

export const logFullscreenUnsupported = function () {
  console.info('fullscreen unsupported')
}

export const logLeaveFullscreen = function () {
  console.info('leave fullscreen')
}

export const logOrientationChange = function (orientation) {
  console.info('orientation change', orientationNames[orientation])
}

export const logResize = function (game, base, display, prevWidth, prevHeight) {
  console.debug('resize', sizeToString(display))
}
