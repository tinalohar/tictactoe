const path = require('path');
const directory = './assets/js';

module.exports = {
  mode: "development",
  entry: path.join(__dirname, '/assets/js/classes.js'),
  output: {
    filename: 'bundle.js',
    path: __dirname + "/assets/js/dist"
  },
  module: {
      rules: [
          {
              test: /\.tsx?$/,
              loader: 'ts-loader',
              exclude: /node_modules/,
          },
      ]
  },
  resolve: {
      extensions: [".tsx", ".ts", ".js"]
  },
};