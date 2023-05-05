import postcss from 'rollup-plugin-postcss'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const
   nm = "toaster",
   minify = process.env.NODE_ENV === 'production'

export default {
   input: `./src/ts/${nm}.ts`,

   output: [
      {
         sourcemap: true,
         dir: `./dist`,
         name: `${nm}${minify ? '.min' : ''}`,
         entryFileNames: `js/${nm}${minify ? '.min' : ''}.js`,
         format: 'umd',
         plugins: minify ? [
            terser({
               format: {
                  comments: false
               }
            })
         ] : []
      },
   ],
   plugins: [
      typescript({ outDir: 'dist/js', }),
      postcss({
         extract: `css/${nm}${minify ? '.min' : ''}.css`,
         minimize: minify,
         sourceMap: true,
         extensions: ['.scss'],
      })
   ]

}
