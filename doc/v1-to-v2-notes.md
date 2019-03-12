# gulp-flow-webpack: v1 to v2

Migration to Webpack 4 and Babel 7.

## Breaking changes

 * https://github.com/webpack/webpack/releases/tag/v2.1.0-beta.23

 * `module.loaders` renamed to `module.rules`
 * `module.preLoaders` (and `postLoaders`) removed.
    Use `module.rules[<i>].ensure` instead (`pre` or `post`).
 * `loader` is a child of `use` in the array `module.rules`.
 * Now gulp-flow-webpack is pre-configured to avoid managing common micro-configs for many projects.
   Of course it's always finely customizable.