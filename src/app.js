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
const helmet = require('@fastify/helmet')
const underPressure = require('@fastify/under-pressure')

function build(opts = {}) {
  const app = fastify(opts)

  // Security plugin
  app.register(helmet,{ 
    contentSecurityPolicy: false 
  })

  // DDOS avoid plugin
  app.register(underPressure, {
    maxHeapUsedBytes: 100000000,
    maxRssBytes: 100000000,
    maxEventLoopDelay: 1000,
    message: 'Under pressure!',
    retryAfter: 50,
  })

  // Autoload /plugins
  app.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // Autoload /routes
  app.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  return app
}

module.exports = build
