/**
 * Webpack plugin
 */

const pluginName = 'clean-css-webpack-plugin';
const minifyCss = require('./minify-css');
const assetMatcherRexp = new RegExp('.css$');
const assetInvertMatcherRexp = new RegExp('min.css$');
const defaultAssetSelector = (name) => (assetMatcherRexp.exec(name) && !assetInvertMatcherRexp.exec(name));

/**
 * clean-css plugin for webpack filters CSS assets, and adds minified assets to the pipeline.
 */
class CleanCssWebpackPlugin {
  /**
   * @param  {Object} options={}
   */
  constructor(options = {}) {
    this.assetSelector = options.assetSelector || defaultAssetSelector;
    this.minifyOptions = options.minifyOptions || {};
  }

  /**
   * Provides entry point to a webpack plugin
   *
   * @param  {Compiler} compiler
   */
  apply(compiler) {
    compiler.hooks.compilation.tap(pluginName, this.compilerHook.bind(this));
  }

  /**
   * Hooks into the compiler unit
   *
   * @param  {Compilation} compilation
   */
  compilerHook(compilation) {
    compilation.hooks.afterOptimizeAssets.tap(pluginName, this.compilationHook(compilation));
  }

  /**
   * Hooks into the compilation unit
   *
   * @param  {Compilation} compilation
   * @return {Function}
   */
  compilationHook(compilation) {
    return (assets) =>
      Object.keys(assets)
          .filter(this.assetSelector)
          .forEach((cssAsset) => this.processAsset(cssAsset, assets, compilation));
  }

  /**
   * Minifies and adds assets to pipeline
   *
   * @param  {string} cssAsset
   * @param  {Source[]} assets
   * @param  {Compilation} compilation
   */
  processAsset(cssAsset, assets, compilation) {
    minifyCss(cssAsset, assets[cssAsset].source(), this.minifyOptions)
        .then((minified) => this.addToAssetPipeline(minified, compilation))
        .catch((error) => error.minifyErrors.forEach((error) => compilation.errors.push(error)));
  }

  /**
   * Adds to asset pipeline
   *
   * @param  {Object} minified
   * @param  {Compilation} compilation
   */
  addToAssetPipeline(minified, compilation) {
    if (minified.warnings) {
      minified.warnings.forEach((w) => compilation.warnings.push(w));
    }

    compilation.assets[minified.minifiedAssetPath] = {
      source: () => minified.styles,
      size: () => minified.styles.length,
    };

    if (this.minifyOptions.sourceMap) {
      compilation.assets[minified.mapPath] = {
        source: () => minified.sourceMap,
        size: () => minified.sourceMap.length,
      };
    }
  }
}

module.exports = CleanCssWebpackPlugin;
