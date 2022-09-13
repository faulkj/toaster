import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import scss from 'rollup-plugin-scss'
import { terser } from "rollup-plugin-terser"
import typescript from 'rollup-plugin-typescript2'

export default {
   input: './src/ts/toaster.ts',

   output: [
      {
         name: "toaster",
         sourcemap: true,
         file: './dist/js/toaster.js',
         format: 'umd'
      },
      {
         name: "toaster.min",
         sourcemap: true,
         file: './dist/js/toaster.min.js',
         format: 'umd',
         plugins: [   
            terser()
         ],
      },
   ],
   plugins: [
      typescript(),
      scss({
         output: './dist/css/toaster.css',
         sourceMap: true
      }),
      babel({ exclude: 'node_modules/**' }),
      commonjs()
   ],

};