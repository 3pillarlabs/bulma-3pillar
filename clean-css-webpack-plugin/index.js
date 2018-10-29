/**
 * Webpack plugin
 */

const minifyCss = require('./minify-css');
const assetMatcherRexp = new RegExp('\.css$');
const assetInvertMatcherRexp = new RegExp('min\.css$');
const defaultAssetSelector = (name) => (assetMatcherRexp.exec(name) && !assetInvertMatcherRexp.exec(name))

class CleanCssWebpackPlugin {

  constructor(options = {}) {
    this.pluginName = 'clean-css-webpack-plugin';
    this.assetSelector = options.assetSelector || defaultAssetSelector;
    this.minifyOptions = options.minifyOptions || {};
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(this.pluginName, this.compilerHook.bind(this));
  }

  compilerHook(compilation) {
    compilation.hooks.afterOptimizeAssets.tap(this.pluginName, this.compilationHook(compilation));
  }

  compilationHook(compilation) {
    return assets =>
      Object.keys(assets)
            .filter(asset => this.assetSelector(asset))
            .forEach(cssAsset => this.processAsset(cssAsset, assets, compilation));
  }

  processAsset(cssAsset, assets, compilation) {
    minifyCss(cssAsset, assets[cssAsset].source(), this.minifyOptions)
      .then(minified => this.addToAssetPipeline(minified, compilation))
      .catch(error => error.minifyErrors.forEach(error => compilation.errors.push(error)));
  }

  addToAssetPipeline(minified, compilation) {
    if (minified.warnings) {
      minified.warnings.forEach(w => compilation.warnings.push(w));
    }

    compilation.assets[minified.minifiedAssetPath] = {
      source: () => minified.styles,
      size: () => minified.styles.length
    };

    if (this.minifyOptions.sourceMap) {
      compilation.assets[minified.mapPath] = {
        source: () => minified.sourceMap,
        size: () => minified.sourceMap.length
      };
    }
  }
}

module.exports = CleanCssWebpackPlugin;
