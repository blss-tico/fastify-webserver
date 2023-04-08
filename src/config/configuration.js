/**
 * @file Module to read configuration variables to application
 *   All variables are inside the .env file. 
 * @author Bruno Leonardo - Tico)
 * @version 1.0.0
 * @license MIT
 * 
 */

 'use strict'

let dte = require('dotenv').config({ path: __dirname + '/.env' })
if (dte.error) { throw dte.error }

function loadEnvironmentVariable(keyname) {
  const envVar = process.env[keyname]
  if (!envVar) {
    throw new Error(`Configuration must include ${keyname}`)
  }
  return envVar
}

module.exports = {
  serverHost: loadEnvironmentVariable('SRV_HOST'),
  serverPort: loadEnvironmentVariable('SRV_PORT'),
  databaseHost: loadEnvironmentVariable('DB_HOST'),
  databasePort: loadEnvironmentVariable('DB_PORT'),
  databaseUser: loadEnvironmentVariable('DB_USER'),
  databaseName: loadEnvironmentVariable('DB_NAME'),
  databasePassword: loadEnvironmentVariable('DB_PASS'),
  databaseWaitForConnections: loadEnvironmentVariable('DB_WAIT_FOR_CONNECTIONS'),
  databaseConnectionLimit: loadEnvironmentVariable('DB_CONNECTION_LIMIT'),
  databaseMaxIdle: loadEnvironmentVariable('DB_MAX_IDLE'),
  databaseIdleTimeout: loadEnvironmentVariable('DB_IDLE_TIMEOUT'),
  databaseQueueLimit: loadEnvironmentVariable('DB_QUEUE_LIMIT'),    
  swaggerHost: loadEnvironmentVariable('SWG_HOST'),
  swaggerPort: loadEnvironmentVariable('SWG_PORT'),
  redisHost: loadEnvironmentVariable('RD_HOST'),
  redisPort: loadEnvironmentVariable('RD_PORT'),
  DEBUG_MODE: false,
}
