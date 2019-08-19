const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
   entry: {
     main: './main.js'
   },
   mode: 'production',
   output: {
      path: path.join(__dirname, '/bundle'),
      filename: 'index_bundle.js'
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react','stage-2']
            }
         },
         {
           test: /\.css$/,
           use: [
             { loader: "style-loader" ,
               options:{
                  hmr:true
               }
            },
             { loader: "css-loader" }
           ]
         },
          {
          test: /\.(gif|png|jpe?g|svg)$/i,
          use: [
            {
              loader:'file-loader',
              options: {
                 name: "./image/[name].[hash].[ext]",
              }
            },
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: '65-90',
                  speed: 4
                },
                gifsicle: {
                  interlaced: false,
                },
                // the webp option will enable WEBP
                webp: {
                  quality: 75
                }
              }
            },
          ]
        }]},
   plugins:[
      new HtmlWebpackPlugin({
         template: './index.html'
      }),
      new CompressionPlugin({ 
        filename: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      })
      // new CompressionPlugin({
      //   filename: '[path].gz[query]',
      //   algorithm: 'gzip',
      //   test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      //   threshold: 10240,
      //   minRatio: 0.8
      // })
   ]
}