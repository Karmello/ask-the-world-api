module.exports = {
  apps: [
    {
      name: 'ask-the-world-api',
      script: 'index.js',
      env: {
        PORT: 9000,
        NODE_ENV: 'production',
        APP_ENV: 'remote-dev',
        API_URL: 'https://ask-the-world-api-master-2011553807.eu-central-1.elb.amazonaws.com',
      },
    },
  ],
}
