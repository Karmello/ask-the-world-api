module.exports = {
  apps: [
    {
      name: 'ask-the-world-api',
      script: 'index.js',
      env: {
        PORT: 9000,
        NODE_ENV: 'production',
        REACT_APP_ENV: 'remote-dev',
        MONGO_URI:
          'mongodb+srv://admin:25Xe5fYhARFobS1d@cluster0.wrpq7.mongodb.net/ask-the-world-dev?retryWrites=true&w=majority',
        AUTH_SECRET: 'lifeislikeaslideshow',
      },
    },
  ],
}
