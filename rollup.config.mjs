import nodeResolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { defineConfig } from 'rollup'

export default defineConfig({
  input: [
    'dist/index.mjs',
  ],
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [
    typescript(),
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs(),
    json(),
    // minify(),
  ],

})
