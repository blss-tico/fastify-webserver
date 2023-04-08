/**
 * @file Plugin to build the database connection with MySQL
 * @author Bruno Leonardo - Tico)
 * @version 1.0.0
 * @license MIT
 * 
 */

 'use strict'

const fp = require('fastify-plugin')
const mysql = require('mysql2');

const configuration = require('../config/configuration')

module.exports = fp(function (fastify, opts, done) {
  const dbPool = mysql.createPool({
    host: configuration.databaseHost,
    port: configuration.databasePort,
    user: configuration.databaseUser,
    database: configuration.databaseName,
    password: configuration.databasePassword,
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
