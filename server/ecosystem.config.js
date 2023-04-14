module.exports = {
    apps : [{
      name: "server",
      script: "./src/server.ts",
      interpreter: "ts-node",
      watch: true,
      env: {
        "NODE_ENV": "production",
        "PORT": 3333
      }
    }]
  }