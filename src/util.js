const { ScaleModes } = Phaser.Scale

const aspectModeNames = {}

for (const name in ScaleModes) {
  aspectModeNames[ScaleModes[name]] = name
}

export const aspectModeToString = function (mode) {
  return aspectModeNames[mode]
}

export const vectorToString = function (vec, precision = 3) {
  return `(${vec.x.toFixed(precision)}, ${vec.y.toFixed(precision)})`
}

export const sizeToString = function (size) {
  return `${size.width.toFixed(1)} × ${size.height.toFixed(1)} [${size.aspectRatio.toFixed(3)}] mode=${aspectModeToString(size.aspectMode)}${size._parent ? (' ← ' + sizeToString(size._parent)) : ''}`
}

export const rectToString = function (rect, precision = 1) {
  return `x=${rect.x.toFixed(precision)} y=${rect.y.toFixed(precision)} w=${rect.width.toFixed(precision)} h=${rect.height.toFixed(precision)}`
}
