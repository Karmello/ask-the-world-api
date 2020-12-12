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
        APP_URL: 'https://ask-the-world-master-1144547669.eu-central-1.elb.amazonaws.com',
        EMAIL_USER: 'app.ask.the.world@gmail.com',
      },
      env_feature: {
        API_URL: 'https://ask-the-world-api-feature-228670306.eu-central-1.elb.amazonaws.com',
        APP_URL: 'https://ask-the-world-feature-507989894.eu-central-1.elb.amazonaws.com',
      },
    },
  ],
}
