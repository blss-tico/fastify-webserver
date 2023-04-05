/**
 * @file Application definitions
 * @author Bruno Leonardo - Tico)
 * @version 1.0.0
 * @license MIT
 * 
 */

'use strict'

const fastify = require('fastify')
const fastifyRedis = require('@fastify/redis')

function build(opts = {}) {
  const app = fastify(opts)

  // plugins register
  app.register(fastifyRedis, { host: '127.0.0.1', port: 6379 })

  // main route
  app.get('/', async (request, reply) => {
    return { msg: 'hello world' }
  })

  // set redis key
  app.get('/set/:key', async (request, reply) => {
    const { redis } = app
    let key = request.params.key
    let result = await redis.set(key, "Hello World", 'ex', 10)
    return { msg: result }
  })

  // get redis key
  app.get('/get/:key', async (request, reply) => {
    const { redis } = app
    let key = request.params.key
    let result = await redis.get(key)
    return { msg: result || 'Key not found' }
  })

  return app
}

module.exports = build
