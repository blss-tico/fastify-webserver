/**
 * @file Routes for health, GET.
 * @author Bruno Leonardo - Tico)
 * @version 1.0.0
 * @license MIT
 * 
 */

'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', {
    schema: {
      description: 'This is an endpoint for application health check',
      tags: ['health'],
      response: {
        200: {
          description: 'Success Response',
          type: 'object',
          properties: {
            msg: { type: 'string' }
          }
        }
      }
    }
  }, (request, reply) => {
    reply.send({ msg: "application is up and running" })
  })
}
