import typescript from '@rollup/plugin-typescript'
import terser from '@rollup/plugin-terser'

const nm = 'toaster'

export default [
   ...[true, false].map(min => ({
      input: `./src/ts/${nm}.ts`,
      output: {
         sourcemap: true,
         dir: './dist',
         name: nm.charAt(0).toUpperCase() + nm.slice(1),
         entryFileNames: `js/${nm}${min ? '.min' : ''}.js`,
         format: 'umd',
         ...(min && { plugins: [terser({ format: { comments: false } })] })
      },
      plugins: [
         typescript({
            outDir: 'dist/js',
            removeComments: true,
            declaration: false
         })
      ]
   }))
]
