module.exports = {
  apps: [
    {
      name: 'ask-the-world-api',
      script: 'index.js',
      env: {
        PORT: 9000,
        NODE_ENV: 'production',
        API_URL: 'localhost:9000',
        EMAIL_USER: 'app.ask.the.world@gmail.com',
      },
      env_feature: {
        APP_ENV: 'remote-dev',
        APP_URL: 'https://feature.ask-the-world.com',
        PAYPAL_API_URL: 'https://api-m.sandbox.paypal.com',
        DISABLE_PAYMENT: 'no',
      },
      env_master: {
        APP_ENV: 'remote-dev',
        APP_URL: 'https://master.ask-the-world.com',
        PAYPAL_API_URL: 'https://api-m.sandbox.paypal.com',
        DISABLE_PAYMENT: 'no',
      },
      env_uat: {
        APP_ENV: 'remote-pre-prod',
        APP_URL: 'https://uat.ask-the-world.com',
        PAYPAL_API_URL: 'https://api-m.paypal.com',
        DISABLE_PAYMENT: 'no',
      },
      env_prod: {
        APP_ENV: 'remote-prod',
      },
    },
  ],
}
