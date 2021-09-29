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
        APP_URL: 'https://ec2-18-194-139-71.eu-central-1.compute.amazonaws.com:8000',
        EMAIL_USER: 'app.ask.the.world@gmail.com',
        PAYPAL_API_URL: 'https://api-m.paypal.com',
      },
      env_feature: {
        APP_URL: 'https://ec2-18-196-70-139.eu-central-1.compute.amazonaws.com:8000',
        PAYPAL_API_URL: 'https://api-m.sandbox.paypal.com',
      },
    },
  ],
}
