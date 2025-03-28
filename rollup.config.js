import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from '@rollup/plugin-terser';
import html from '@web/rollup-plugin-html';

export default {
  input: 'src/index.js', // Adjust the input file as needed
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
  },
  plugins: [
    resolve(),
    commonjs(),
    terser(),
    html({
      input: 'index.html', // Adjust the HTML file as needed
    }),
  ],
};