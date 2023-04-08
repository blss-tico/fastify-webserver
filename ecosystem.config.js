/**
 * @file application config file for PM2
 * @author Bruno Leonardo - Tico)
 */

// Commands:
// pm2 start ecosystem.config.js --env production --watch (hot reload)
// pm2 start ecosystem.config.js --env production
// pm2 restart ecosystem.config.js --env production
// pm2 stop ecosystem.config.js --env production
// pm2 list ecosystem.config.js --env production
// pm2 logs ecosystem.config.js --env production
// pm2 monit

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
