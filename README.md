# gulp-flow-webpack

Webpack bundle for [gulp-flow](https://github.com/gulp-flow/gulp-flow).


## Requirements

 * [gulp-flow](https://github.com/gulp-flow/gulp-flow) must be installed.


## Install

```sh
npm install --save-dev gulp-flow-webpack
```

## Usage

### Configure

By default this bundle is preconfigured in `cfg.webpack`, only the `entry` is required.

Example of a common use case:

```js
let flow = require('gulp-flow');
let {cfg, webpack} = flow;

cfg.webpack.entry.main = './src/index.js';

cfg.webpack.plugins = [
  new webpack.IgnorePlugin(/_[a-z-A-Z0-9-]\//),
  new webpack.DefinePlugin({
    // JSON: "string", inject the current environment (dev, prod, ...)
    __ENV: `"${cfg.env}"`
  }),
  new webpack.optimize.DedupePlugin()
];
```

You can overwrite:

```js
cfg.webpack.resolve.extensions = ['', '.js', '.jsx', '.json'/*,.other*/];
cfg.webpack.module.loaders[0].query.presets = [
  'es2015',
  'stage-1',
  'react',
  // 'other'
];

cfg.webpack.module.loaders[0].query.plugins = [
  'transform-runtime',
  'transform-decorators-legacy'
  // 'transform-other'
];
```

### Task

A simple example:

```js
let gulp = require('gulp');
let flow = require('gulp-flow');
let {cfg, gp} = flow;

gulp.task('build.webpack', function() {
  return gulp.src(cfg.webpack.entry.main)
    .pipe(gp.webpack(cfg.webpack))
    .pipe(gulp.dest(cfg.publicJsDir))
  ;
});
```

And run your task: `gulp build.webpack`


## LICENSE

[MIT](https://github.com/gulp-flow/gulp-flow-webpack/blob/master/LICENSE) (c) 2016, Nicolas Tallefourtane.


## Author

| [![Nicolas Tallefourtane - Nicolab.net](http://www.gravatar.com/avatar/d7dd0f4769f3aa48a3ecb308f0b457fc?s=64)](http://nicolab.net) |
|---|
| [Nicolas Talle](http://nicolab.net) |
| [![Make a donation via Paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PGRH4ZXP36GUC) |