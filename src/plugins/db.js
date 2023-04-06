const fp = require('fastify-plugin')
const mysql = require('mysql2');

const configuration = require('../config/configuration')

module.exports = fp(function (fastify, opts, done) {
  const dbPool = mysql.createPool({
    host: configuration.databaseHost,
    port: configuration.databasePort,
    user: configuration.databaseUser,
    database: configuration.databaseName,
    waitForConnections: configuration.databaseWaitForConnections,
    connectionLimit: configuration.databaseConnetionLimit,
    maxIdle: configuration.databaseMaxIdle,
    idleTimeout: configuration.databaseIdleTimeout,
    queueLimit: configuration.databaseQueueLimit
  })
  const poolPromise = dbPool.promise()

  fastify.decorate('db', poolPromise)
  done()
})
