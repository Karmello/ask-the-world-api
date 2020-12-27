module.exports = {
  apps: [
    {
      name: 'ask-the-world-api',
      script: 'index.js',
      env: {
        PORT: 9000,
        NODE_ENV: 'production',
        APP_ENV: 'remote-dev',
        API_URL: 'https://localhost:9000',
        APP_URL: 'https://ask-the-world-master-1144547669.eu-central-1.elb.amazonaws.com',
        EMAIL_USER: 'app.ask.the.world@gmail.com',
      },
      env_feature: {
        APP_URL: 'https://ask-the-world-feature-507989894.eu-central-1.elb.amazonaws.com',
      },
    },
  ],
}
