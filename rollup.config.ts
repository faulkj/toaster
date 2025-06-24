import postcss from 'rollup-plugin-postcss'
import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const
   nm = 'toaster',

   basePlugins = [
      typescript({
         tsconfig: './tsconfig.json',
         outDir: 'dist/js',
         removeComments: true,
         declaration: false
      })
   ]

export default [
   {
      input: `./src/ts/${nm}.ts`,
      output: {
         sourcemap: true,
         dir: `./dist`,
         name: `Toaster`,
         entryFileNames: `js/${nm}.js`,
         format: 'umd'
      },
      plugins: [
         ...basePlugins,
         postcss({
            extract: `css/${nm}.css`,
            minimize: false,
            sourceMap: true,
            extensions: ['.scss']
         })
      ]
   },
   {
      input: `./src/ts/${nm}.ts`,
      output: {
         sourcemap: true,
         dir: `./dist`,
         name: `Toaster`,
         entryFileNames: `js/${nm}.min.js`,
         format: 'umd',
         plugins: [
            terser({
               format: {
                  comments: false
               }
            })
         ]
      },
      plugins: [
         ...basePlugins,
         postcss({
            extract: `css/${nm}.min.css`,
            minimize: true,
            sourceMap: true,
            extensions: ['.scss']
         })
      ]
   }
]
