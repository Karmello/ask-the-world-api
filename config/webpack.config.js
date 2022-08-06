const path = require('path')
const webpack = require('webpack')

const { APP_LANG = 'EN' } = process.env

module.exports = {
  name: 'bundle',
  target: 'node',
  mode: process.env.NODE_ENV,
  cache: true,
  devtool: false,
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
    symlinks: false,
    cacheWithContext: false,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: path.resolve(__dirname, './../src'),
        use: [{ loader: 'babel-loader' }, { loader: 'ts-loader' }],
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, './../src'),
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BUILD_TIMESTAMP': JSON.stringify(Date.now()),
      'process.env.APP_LANG': JSON.stringify(APP_LANG),
    }),
  ],
  externals: {
    bufferutil: 'bufferutil',
    'utf-8-validate': 'utf-8-validate',
    'mongodb-client-encryption': 'mongodb-client-encryption',
    aws4: 'aws4',
    snappy: 'snappy',
    'snappy/package.json': 'snappy/package.json',
    kerberos: 'kerberos',
    'bson-ext': 'bson-ext'
  },
}
