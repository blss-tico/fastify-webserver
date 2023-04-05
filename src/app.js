/**
 * @file Application definitions
 * @author Bruno Leonardo - Tico)
 * @version 1.0.0
 * @license MIT
 * 
 */

'use strict'

const fastify = require('fastify')

function build(opts={}) {
  const app = fastify(opts)
  
  // main route
  app.get('/', async function (request, reply) {
    return { msg: 'hello world' }
  })

  return app
}

module.exports = build
