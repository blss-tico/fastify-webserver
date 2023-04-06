/**
 * @file Application definitions
 * @author Bruno Leonardo - Tico)
 * @version 1.0.0
 * @license MIT
 * 
 */

'use strict'

const path = require('path')
const fastify = require('fastify')
const AutoLoad = require('@fastify/autoload')
const fastifyRedis = require('@fastify/redis')

function build(opts = {}) {
  const app = fastify(opts)

  // plugins register
  app.register(fastifyRedis, { host: '127.0.0.1', port: 6379 })

  app.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  app.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  // set redis key
  app.get('/set/:key', async (request, reply) => {
    const { redis } = app
    let { key } = request.params
    let result = await redis.set(key, "Hello World", 'ex', 10)
    return { msg: result }
  })

  // get redis key
  app.get('/get/:key', async (request, reply) => {
    const { redis } = app
    let { key } = request.params
    let result = await redis.get(key)
    if (result == null) {
      throw { statusCode: 204, msg: 'Key not found' }
    } else {
      return { msg: result }
    }
  })

  return app
}

module.exports = build
