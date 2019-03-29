/**
 * This file is part of gulp-flow-webpack.
 *
 * (c) Nicolas Tallefourtane <dev@nicolab.net>
 *
 * For the full copyright and license information, please view the LICENSE file
 * distributed with this source code
 * or visit https://github.com/gulp-flow/gulp-flow.
 */

'use strict';

let flow = require('gulp-flow');
let {cfg, gp, utils, envList} = flow;


// utils
utils.webpack = require('webpack');

// gulp plugin
gp.webpack = require('webpack-stream');

// config
cfg.webpack = {
  mode: envList.NODE_ENV,
  cache: true,
  watch: false,
  devtool: 'cheap-module-eval-source-map',

  entry: {

  },

  output: {
    filename: '[name].js',
    pathinfo: true,
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {

    },
  },

  externals: {

  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            // https://github.com/babel/babel-loader#options
            babelrc: false,
            cacheDirectory: true,
            cacheCompression: false,
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  targets: {
                    browsers: ['last 2 versions', 'safari >= 7', 'IE >= 9']
                  },
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              '@babel/plugin-transform-runtime',
              '@babel/plugin-transform-modules-commonjs',
              '@babel/plugin-syntax-dynamic-import',

              '@babel/plugin-proposal-export-default-from',
              '@babel/plugin-proposal-logical-assignment-operators',
              ['@babel/plugin-proposal-optional-chaining', { loose: false }],
              ['@babel/plugin-proposal-pipeline-operator', { proposal: 'minimal' }],
              ['@babel/plugin-proposal-nullish-coalescing-operator', { loose: false }],
              '@babel/plugin-proposal-do-expressions',

              '@babel/plugin-proposal-numeric-separator',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              '@babel/plugin-proposal-export-namespace-from',
              '@babel/plugin-proposal-throw-expressions',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new utils.webpack.IgnorePlugin(/_[a-z-A-Z0-9-]\//),

    new utils.webpack.DefinePlugin({
      'process.env': {
        get NODE_ENV() {
          return `"${envList.NODE_ENV}"`;
        },
      },
      get __ENV() {
        // JSON: "string"
        return `"${cfg.env}"`;
      },

      get __NODE_ENV() {
        // JSON: "string"
        return `"${envList.NODE_ENV}"`;
      },

      get __VERSION() {
        // JSON: "string"
        return `"${cfg.pkg.version}"`;
      },

      get __PLATFORM() {
        let p = process;
        // JSON: "string"
        return `"${p.platform}-${p.arch}-${p.title}_${p.version}"`;
      },
    }),

    // example: new HtmlWebpackPlugin({
    //   filename: "index.html",
    //   template: path.join(cfg.rootPath, cfg.srcDir, 'index.html')
    // })
  ],
};

if (envList.NODE_ENV === 'production') {
  cfg.webpack.devtool = false;
  cfg.webpack.output.pathinfo = false;
  cfg.webpack.plugins.push(new utils.webpack.optimize.OccurrenceOrderPlugin());
}
