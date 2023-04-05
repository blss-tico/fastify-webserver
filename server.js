/**
 * @file Fastify Web Server, entry point
 * @author Bruno Leonardo - Tico)
 * @version 1.0.0
 * @license MIT
 * 
 */

'use strict'

require('dotenv').config()

const server = require('./src/app')({
  logger: {
    level: 'info'
  }
})

server.listen({ port: process.env.PORT, host: process.env.HOST }, (err, address) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
  server.log.info(`server listenning on ${address}`)
})
