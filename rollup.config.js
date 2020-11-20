import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import buble from '@rollup/plugin-buble'
import serve from 'rollup-plugin-serve'
import pkg from './package.json'

export default [
  {
    input: 'src/main.js',
    output: [
      {
        name: 'PhaserDebugGameScalePlugin',
        file: pkg.browser,
        format: 'umd',
        globals: { phaser: 'Phaser' }
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    external: ['phaser'],
    plugins: [
      resolve(),
      commonjs(),
      buble({ exclude: ['node_modules/**'] }),
      process.env.ROLLUP_WATCH ? serve({ contentBase: '', open: true, openPage: '/demo/' }) : null
    ]
  }
]