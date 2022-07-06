module.exports = {
  apps: [
    {
      name: 'ask-the-world-api',
      script: 'index.js',
      env: {
        PORT: 9000,
        NODE_ENV: 'production',
        EMAIL_USER: 'app.ask.the.world@gmail.com',
      },
      env_feature: {
        APP_ENV: 'remote-dev',
        FE_URL: 'https://feature.ask-the-world.com',
      },
      env_master: {
        APP_ENV: 'remote-dev',
        FE_URL: 'https://master.ask-the-world.com',
      },
      env_uat: {
        APP_ENV: 'remote-pre-prod',
        FE_URL: 'https://uat.ask-the-world.com',
      },
      env_prod: {
        APP_ENV: 'remote-prod',
      },
    },
  ],
}
