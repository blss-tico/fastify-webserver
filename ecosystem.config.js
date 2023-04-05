/**
 * @file Ecosystem config file for PM2
 * @author Bruno Leonardo - Tico)
 */

module.exports = {
  apps: [{
    name: "server",
    script: "./server.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
