
/**
 * @file Plugin to build API documentation with swagger, 
 *   The route to see the API is http://ip:port/documentation 
 * @author Bruno Leonardo - Tico)
 * @version 1.0.0
 * @license MIT
 * 
 */

'use strict'

const fp = require('fastify-plugin')

const configuration = require('../config/configuration')

module.exports = fp(async function (fastify, opts) {
  await fastify.register(require('@fastify/swagger'), {})
  await fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Fastify Web Server',
        description: 'Fastify Web Server with MySQL and Redis',
        version: '1.0.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: configuration.swaggerHost + ':' + configuration.swaggerPort,
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [
        { name: 'cards', description: 'Cards related end-points' },
      ],
    },
    exposeRoute: true
  })

  // Executes Swagger
  fastify.ready(err => {
    if (err) throw err
    fastify.swagger()
  })
})
