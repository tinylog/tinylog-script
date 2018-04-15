var path = require('path')
var SpritesmithPlugin = require('webpack-spritesmith')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var webpack = require('webpack')
var HtmlPlugin = require('html-webpack-plugin');
var uglify = require('uglifyjs-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: resolve('/src/index.js'),
  output: {
    path: resolve('/public'),
    filename: '[hash].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          }, {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }],
          publicPath: '/'
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'images/[hash].[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "style/[name].css?[hash]-[chunkhash]-[contenthash]-[name]",
      disable: false,
      allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new SpritesmithPlugin({
      // 目标小图标
      src: {
        cwd: resolve('/src/assets/images/icons'),
        glob: '*.png'
      },
      // 输出雪碧图文件及样式文件
      target: {
        image: resolve('/public/images/sprites/sprite.png'),
        css: resolve('/public/images/sprites/sprite.css')
      },
      // 样式文件中调用雪碧图地址写法
      apiOptions: {
        cssImageRef: './sprite.png'
      },
      spritesmithOptions: {
        algorithm: 'top-down'
      }
    }),
    new HtmlPlugin({
      title: 'Gy-Cli',
	    filename: resolve('/public/index.html')
    }),
    new uglify()
  ],
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    inline: true
  }
}