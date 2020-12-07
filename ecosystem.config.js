module.exports = {
  apps: [
    {
      name: 'ask-the-world-api',
      script: 'index.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        PORT: 9000,
        NODE_ENV: 'production',
        APP_ENV: 'remote-dev',
      },
    },
  ],
}
