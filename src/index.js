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
  cache: true,
  debug: true,
  watch: false,
  devtool: 'inline-source-map',

  entry: {

  },

  output: {
    filename: '[name].js',
    pathinfo: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {

    }
  },

  externals: {

  },

  module: {
    preLoaders: [],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          // https://github.com/babel/babel-loader#options
          cacheDirectory: true,
          presets: [
            'es2015',
            'stage-1',
            'react'
          ],
          plugins: [
            'transform-runtime',
            'transform-decorators-legacy'
          ]
        }
      }
    ]
  },
  plugins: []
};

if(envList.NODE_ENV === 'production') {
  cfg.webpack.devtool = false;
  cfg.webpack.output.pathinfo = false;
}
