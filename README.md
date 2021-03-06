# gulp-flow-webpack

Webpack bundle for [gulp-flow](https://github.com/gulp-flow/gulp-flow).


## Requirements

* [gulp-flow](https://github.com/gulp-flow/gulp-flow) must be installed.


## Install

```sh
npm install --save-dev gulp-flow-webpack @babel/runtime
```

or

```sh
yarn add --dev gulp-flow-webpack @babel/runtime
```

> @babel/runtime is a production dependency (since it's for the "runtime").
> The transformation plugin is typically used only in development,
> but the runtime itself will be depended on by your deployed code.

## Usage

### Configure

By default this bundle is preconfigured in `cfg.webpack`, only the `entry` and the source path are required.

Example of a common use case with _React.js_:

```sh
yarn add --dev gulp-flow-webpack @babel/runtime
```

_tasks/bundles/webpack.js_
```js
'use strict';

let path = require('path');
let flow = require('gulp-flow');

// load webpack bundle
require('gulp-flow-webpack');

let {cfg, utils} = flow;
let {webpack} = utils;
let {rootPath, srcDir, notSrcDir} = cfg;

// ignore JS(X) in files tasks
cfg.files.src.push(
  notSrcDir + '/app/**/*.{js, jsx}'
);

cfg.files.srcWatch.push(
  notSrcDir + '/app/**/*.{js, jsx}'
);

cfg.webpack.entry.app = './' + srcDir + '/app/index.js';
cfg.webpack.resolve.alias.app = path.join(rootPath, srcDir + '/app');

cfg.webpack.plugins.push(
  new webpack.ProvidePlugin({
    __: path.join(rootPath, srcDir + '/app/core'),
    _: 'lodash',
    React: 'react',
    ReactDOM: 'react-dom',
    autobind: 'autobind-decorator'
  }),
);

cfg.webpack.module.rules[0].include = [
  path.join(rootPath, srcDir + '/app'),
];
```

You can overwrite:

```js
cfg.webpack.resolve.extensions = ['.js', '.jsx', '.json'/*,.other*/];
cfg.webpack.module.rules[0].use.presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: 3,
      targets: {
        browsers: ['last 2 versions']
      },
    },
  ],
  '@babel/preset-react',
  // 'other'
];

cfg.webpack.module.rules[0].use.plugins = [
  '@babel/plugin-transform-runtime',
  '@babel/plugin-transform-modules-commonjs',
  '@babel/plugin-syntax-dynamic-import',
  // ...
];
```

Or only change a specific config:

```js
cfg.webpack.module.rules[0].use.options.presets[0][1].useBuiltIns = 'entry';
cfg.webpack.module.rules[0].use.options.presets[0][1]['corejs'] = '2';
```

#### eslint

eslint example:

```json
{
  "parser": "babel-eslint",
  "extends": [
    "common-react"
  ],
  "env": {
    "browser": true,
    "commonjs": true,
    "es6": true
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "globals": {
    "autobind": false,
    "React": false,
    "ReactDOM": false
  },
  "rules": {
    "no-return-assign": 0
  }
}
```

### Task

A simple example:

_gulpfile.js_
```js
let gulp = require('gulp');
let flow = require('gulp-flow');
let {cfg, gp, utils} = flow;

// load (custom) webpack bundle
require('./tasks/bundles/webpack');


// build: JS
gulp.task('build.js', function buildJS() {
  return gulp.src(cfg.webpack.entry.app)
    .pipe(gp.webpack(cfg.webpack, utils.webpack))
    .pipe(gulp.dest(cfg.publicJsDir))
  ;
});
```

And run your task: `gulp build.js`


## LICENSE

[MIT](https://github.com/gulp-flow/gulp-flow-webpack/blob/master/LICENSE) (c) 2016, Nicolas Tallefourtane.


## Author

| [![Nicolas Tallefourtane - Nicolab.net](https://www.gravatar.com/avatar/d7dd0f4769f3aa48a3ecb308f0b457fc?s=64)](https://nicolab.net) |
|---|
| [Nicolas Talle](https://nicolab.net) |
| [![Make a donation via Paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PGRH4ZXP36GUC) |
