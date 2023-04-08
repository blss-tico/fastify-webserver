/**
 * @file Plugin to build the cache connection with Redis
 * @author Bruno Leonardo - Tico)
 * @version 1.0.0
 * @license MIT
 * 
 */

 'use strict'

const fp = require('fastify-plugin')
const fastifyRedis = require('@fastify/redis')

const configuration = require('../config/configuration')

module.exports = fp(function (fastify, opts, done) {
  let redisPlugin = fastify.register(fastifyRedis, { 
    host: configuration.redisHost, 
    port: configuration.redisPort 
  })

  fastify.decorate('rd', redisPlugin)
  done()
})
