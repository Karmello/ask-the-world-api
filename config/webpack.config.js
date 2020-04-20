const path = require('path')

module.exports = {
  name: 'bundle',
  target: 'node',
  mode: process.env.NODE_ENV,
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './../build'),
    filename: 'index.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, './../src'),
        loader: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './../src'),
        loader: 'babel-loader',
      },
    ],
  },
}
