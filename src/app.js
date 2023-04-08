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

function build(opts = {}) {
  const app = fastify(opts)

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
