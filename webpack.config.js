const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require('webpack');
const { version } = require('./package.json');
const year = (new Date()).getFullYear();

module.exports = (env, options) => {
   return {
      entry: {
         toaster: './src/toaster.js'
      },
      output: {
         path: path.resolve(__dirname, 'dist'),
         filename: options.mode === 'production' ? 'js/[name].min.js' : 'js/[name].js'
      },
      target: ["web", 'es5'],
      module: {
         rules: [
            {
               test: /\.m?js$/,
               use: {
                  loader: "swc-loader"
               }
            },
            {
               test: /\.(sa|sc|c)ss$/,
               use: [
                  MiniCssExtractPlugin.loader,
                  "css-loader",
                  "sass-loader"
               ],
            }
         ],
      },
      plugins: [
         new MiniCssExtractPlugin({
            filename: options.mode === 'production' ? 'css/[name].min.css' : 'css/[name].css'
         }),
         new webpack.BannerPlugin({
            banner: `Toaster v${version}\nKopimi ${year} Joshua Faulkenberry`,
          })
      ],
      optimization: {
         minimize: options.mode === 'production',
         minimizer: [new TerserPlugin({
            extractComments: false,
            terserOptions: {
               output: {
                  preamble: `/*!\n * Toaster v${version}\n * Kopimi ${year} Joshua Faulkenberry\n */`,
                  comments: false,
               },
            },
         })],
      }
   };
};