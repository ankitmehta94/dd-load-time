const assests = require('../build/asset-manifest.json');
console.log(assests)

const path = require('path');
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');

module.exports = {
  output: {
    filename: './final-ys.js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new MergeIntoSingleFilePlugin({
      "bundle.js": assests.entrypoints.filter((x) => x.indexOf('.js') > -1),
    })
  ]
};