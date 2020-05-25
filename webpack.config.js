const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: {
        presets: [
          '@babel/preset-env'
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties'
        ]
      }
    }
  ]
  if (isDev) {
    loaders.push('eslint-loader');
  }
  return loaders;
}
const optimization = () => {
  const config = {
    // splitChunks: {
    //   chunks: 'all'
    // }
  }
  if (isProd) {
    config.minimizer = [
      new TerserPlugin
    ]
  }

  return config;
}
const entryFile = () => {
  const entry = {
    'decimal-sdk-js': ['@babel/polyfill', './index.js']
  }
  if (isDev) {
    entry.test = './test/main.js'
  }
  return entry;
}
const plugins = () => {
  const plugins = [
    new CleanWebpackPlugin,
    new webpack.IgnorePlugin(/^\.\/wordlists\/(?!english)/, /bip39\/src$/),
  ]
  if (isDev) {
    plugins.push(
      new HTMLWebpackPlugin({
        filename: 'index.html',
        template: './test/index.html',
        minify: {
          collapseWhitespace: isProd,
        }
      }),
      new HTMLWebpackPlugin({
        filename: 'doc.html',
        template: './test/doc.html'
      })
    );
  }
  return plugins;
}


module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: entryFile(),
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, 'dist'),
    library: 'decimalJS',
    libraryTarget:'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.json'],
  },
  optimization: optimization(),
  devServer: {
    port: 8080,
    hot: isDev,
    host: 'localhost'
  },
  plugins: plugins(),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: jsLoaders()
      }
    ]
  },
  node: {
    fs: 'empty'
  }
}