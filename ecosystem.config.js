module.exports = {
  apps: [
    {
      name: 'ask-the-world-api',
      script: 'index.js',
      env: {
        PORT: 9000,
        NODE_ENV: 'production',
      },
    },
  ],
}
