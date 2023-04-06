const fp = require('fastify-plugin')

const configuration = require('../config/configuration')

module.exports = fp(async function (fastify, opts) {
  fastify.register(require('@fastify/swagger'), {
    routePrefix: '/swagger',
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
    },
    exposeRoute: true
  })
})