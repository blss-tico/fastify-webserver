/**
 * @file Routes for cards, CRUD
 * @author Bruno Leonardo - Tico)
 * @version 1.0.0
 * @license MIT
 * 
 */

'use strict'

const cardsDAOPlugin = require('../../services/cardsDAO')
const configuration = require('../../config/configuration')

module.exports = async function (fastify, opts) {

  fastify.register(cardsDAOPlugin)

  fastify.get('/', {
    schema: {
      description: 'This is an endpoint for fetching all cards',
      tags: ['cards'],
      response: {
        200: {
          description: 'Success Response',
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              category: { type: 'string' },
              title: { type: 'string' },
              price: { type: 'number' }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    const cards = await fastify.cardsDAO.getAllCards();
    return cards;
  })

  fastify.get('/:id', {
    schema: {
      description: 'This is an endpoint for fetching a card by id',
      tags: ['cards'],
      params: {
        description: 'Card Id',
        type: 'object',
        properties: {
          id: { type: 'number' }
        }
      },
      response: {
        200: {
          description: 'Success Response',
          type: 'object',
          properties: {
            id: { type: 'number' },
            category: { type: 'string' },
            title: { type: 'string' },
            price: { type: 'number' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params
    const { redis } = fastify

    let card = null
    card = await redis.get('card' + id)
    if (card == null) {
      card = await fastify.cardsDAO.getCardById(id);
      await redis.set('card' + id, JSON.stringify(card), 'ex', 10)
      if (configuration.DEBUG_MODE) { console.log('mysql', card) }
      return card
    } else {
      if (configuration.DEBUG_MODE) { console.log('redis', card) }
      return JSON.parse(card)
    }
  })

  fastify.post('/', {
    schema: {
      description: 'This is an endpoint for creating a new card',
      tags: ['cards'],
      body: {
        description: 'Payload for creating a new Card',
        type: 'object',
        properties: {
          category: { type: 'string' },
          title: { type: 'string' },
          price: { type: 'number' }
        }
      },
      response: {
        201: {
          description: 'Success Response',
          type: 'object',
          properties: {
            id: { type: 'number' },
            category: { type: 'string' },
            title: { type: 'string' },
            price: { type: 'number' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { category, title, price } = request.body;
    const newCard = await fastify.cardsDAO.createCard(category, title, price)
    reply.code(201).send(newCard)
  })

  fastify.put('/:id', {
    schema: {
      description: 'This is an endpoint for updating an existing card',
      tags: ['cards'],
      params: {
        description: 'Card Id',
        type: 'object',
        properties: {
          id: { type: 'number' }
        }
      },
      body: {
        description: 'Payload for updating a new Card',
        type: 'object',
        properties: {
          category: { type: 'string' },
          title: { type: 'string' },
          price: { type: 'number' }
        }
      },
      response: {
        200: {
          description: 'Success Response',
          type: 'object',
          properties: {
            id: { type: 'number' },
            category: { type: 'string' },
            title: { type: 'string' },
            price: { type: 'number' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params
    const { category, title, price } = request.body;
    const updatedCard = await fastify.cardsDAO.updateCard(id, category, title, price)
    return updatedCard
  })

  fastify.delete('/:id', {
    schema: {
      description: 'This is an endpoint for PERMANENTLY DELETING an existing card',
      tags: ['cards'],
      params: {
        description: 'Card Id',
        type: 'object',
        properties: {
          id: { type: 'number' }
        }
      },
      response: {
        204: {
          type: 'string',
          default: 'No Content'
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params;
    await fastify.cardsDAO.deleteCard(id)
    reply.status(204)
  })
}
