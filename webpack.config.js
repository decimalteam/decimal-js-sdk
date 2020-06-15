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
  const config = {};
  if (isProd) {
    config.minimizer = [
      new TerserPlugin
    ]
  }

  return config;
}
const entryFile = () => {
  const entry = {
    'decimal-sdk-web': ['@babel/polyfill', './index.js'],
  }
  if (isDev) {
    entry.test = './test/main.js'
  }
  return entry;
}
const plugins = () => {
  const plugins = [
    // new CleanWebpackPlugin,
    new webpack.IgnorePlugin(/^\.\/wordlists\/(?!english)/, /bip39\/src$/),
  ]
  if (isDev) {
    plugins.push(
      new HTMLWebpackPlugin({
        filename: 'index.html',
        template: './test/index.html',
      }),
    );
  }
  return plugins;
}


const clientConfig = {
  context: path.resolve(__dirname, 'src'),
  entry: entryFile(),
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, 'dist'),
    library: 'decimalJS',
    libraryTarget:'umd',
    umdNamedDefine: true,
    globalObject: `(typeof self !== 'undefined' ? self : this)`
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.json'],
  },
  plugins: plugins(),
  optimization: optimization(),
  devServer: {
    port: 8080,
    hot: isDev,
    host: 'localhost'
  },
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

const serverConfig = {
  target: 'node',
  context: path.resolve(__dirname, 'src'),
  entry: {
    'decimal-sdk-node': ['@babel/polyfill', './index.js'],
  },
  output: {
    filename: `[name].js`,
    path: path.resolve(__dirname, 'dist'),
    library: 'decimalJS',
    libraryTarget:'umd',
    umdNamedDefine: true,
    globalObject: `(typeof self !== 'undefined' ? self : this)`
  },
  resolve: {
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.json'],
  },
  plugins:   [
    new webpack.IgnorePlugin(/^\.\/wordlists\/(?!english)/, /bip39\/src$/),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin
    ]
  },
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

const configs = [clientConfig];

if (isProd) {
  configs.push(serverConfig);
}

module.exports = configs;