require('ts-node/register')
require('tsconfig-paths/register')

require('@babel/register')({
  ignore: [/(node_modules)/],
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
})

require('./index')
