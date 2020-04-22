module.exports = function (api) {
  //
  api.cache(true)

  const presets = ['@babel/preset-env', '@babel/preset-typescript']

  const plugins = [
    [
      'module-resolver',
      {
        alias: {
          '^src(.+)': './src/\\1',
          '^(controllers|utils|models)(.+)': './src/\\1/\\2',
        },
      },
    ],
    '@babel/plugin-proposal-class-properties',
  ]

  const env = {}

  return {
    presets,
    plugins,
    env,
  }
}
