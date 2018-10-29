/**
 * Minifier
 */

const CleanCss = require('clean-css');
const path = require('path');
const lineBreak = require('os').EOL;

module.exports = (assetPath, source, options) => {
  const assetDir = path.dirname(assetPath);
  const assetFile = path.basename(assetPath);
  const assetExtn = path.extname(assetFile);
  const assetName = path.basename(assetFile, assetExtn);
  const minifiedAssetFile = `${assetName}.min${assetExtn}`;
  const minifiedAssetPath = path.join(assetDir, minifiedAssetFile);
  const cleanCssOptions = { ...options, output: minifiedAssetFile };

  return new Promise((resolve, reject) => {
    const minified = new CleanCss(cleanCssOptions).minify({
      [assetFile]: { styles: source }
    });

    if (minified.errors && minified.errors.length > 0) {
      const error = new Error('Failed to clean-css');
      Object.defineProperty(error, 'minifyErrors', {
        value: minified.errors.map(e => new Error(e))
      });
      reject(error);
      return;
    }

    let warnings = null;
    if (minified.warnings && minified.warnings.length > 0) {
      warnings = minified.warnings.map(w => new Error(w));
    }

    const stats = minified.stats;

    let mapFile = null;
    let styles = null;
    let sourceMap = null;
    let mapPath = null;
    if (cleanCssOptions.sourceMap) {
      mapFile = `${assetFile}.map`;
      styles = `${minified.styles}${lineBreak}/*# sourceMappingURL=${mapFile} */`;
      sourceMap = minified.sourceMap.toString();
      mapPath = path.join(assetDir, mapFile);
    } else {
      styles = minified.styles;
    }

    resolve({warnings, styles, sourceMap, stats, mapPath, minifiedAssetPath});
  });
}
