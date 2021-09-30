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
        APP_URL: 'https://3.126.86.4',
        EMAIL_USER: 'app.ask.the.world@gmail.com',
        PAYPAL_API_URL: 'https://api-m.paypal.com',
        DISABLE_PAYMENT: 'yes',
      },
      env_feature: {
        APP_URL: 'https://3.69.212.40',
        PAYPAL_API_URL: 'https://api-m.sandbox.paypal.com',
        DISABLE_PAYMENT: 'no',
      },
    },
  ],
}
