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
          'mongodb://admin:Jordan#23@cluster0-shard-00-00.wrpq7.mongodb.net:27017,cluster0-shard-00-01.wrpq7.mongodb.net:27017,cluster0-shard-00-02.wrpq7.mongodb.net:27017/ask-the-world-dev?ssl=true&replicaSet=atlas-1o0xqx-shard-0&authSource=admin&retryWrites=true&w=majority',
      },
    },
  ],
}
