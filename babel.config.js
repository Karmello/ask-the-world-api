module.exports = function (api) {
  //
  api.cache(true)

  const presets = ['@babel/preset-env', '@babel/preset-typescript']

  const plugins = [
    [
      'module-resolver',
      {
        alias: {
          '^shared(.+)': './src/lib/atw-shared/\\1',
          '^src(.+)': './src/\\1',
          '^(controllers|utils|models|mocks|validation|middleware|helpers)(.+)': './src/\\1/\\2',
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
