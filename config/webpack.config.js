const childProcess = require('child_process')
const path = require('path')
const webpack = require('webpack')
const copyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  name: 'bundle',
  target: 'node',
  mode: process.env.NODE_ENV,
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, './../build'),
    filename: 'index.js',
  },
  node: {
    __dirname: false,
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
  plugins: [
    new copyWebpackPlugin({
      patterns: [
        './node_modules/swagger-ui-dist/swagger-ui.css',
        './node_modules/swagger-ui-dist/swagger-ui-bundle.js',
        './node_modules/swagger-ui-dist/swagger-ui-standalone-preset.js',
        './node_modules/swagger-ui-dist/favicon-16x16.png',
        './node_modules/swagger-ui-dist/favicon-32x32.png',
      ],
    }),
    new webpack.DefinePlugin({
      'process.env.BRANCH_NAME': JSON.stringify(
        childProcess
          .execSync('git branch --format="%(if)%(HEAD)%(then)%(refname:short)%(end)"')
          .toString()
          .trim()
      ),
      'process.env.COMMIT_HASH': JSON.stringify(
        childProcess.execSync('git rev-parse --short HEAD').toString().trim()
      ),
    }),
  ],
}
