module.exports = function (api) {
  api.cache(true)

  const presets = ['@babel/preset-env', '@babel/preset-typescript']

  const plugins = [
    [
      'module-resolver',
      {
        alias: {
          '^atw-shared(.+)': './src/ext/ask-the-world-shared/source/\\1',
          '^src(.+)': './src/\\1',
          '^(controllers|utils|models|db|validation|middleware|helpers)(.+)':
            './src/\\1/\\2',
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
