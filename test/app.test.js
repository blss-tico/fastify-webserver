/**
 * @file Application test cases
 * @author Bruno Leonardo - Tico)
 * @version 1.0.0
 * @license MIT
 * 
 */

'use strict'

const assert = require('assert')
const build = require('../src/app')

const test = async () => {
  console.log('Tests for fastify-webserver ...')

  const app = build()

  // inject request for route /
  const response = await app.inject({
    method: 'GET',
    url: '/'
  })

  // make some assertions
  assert.equal(response.statusCode, 200, "Test - / - Response Code Failed")
  assert.equal(
    response.headers['content-type'],
    'application/json; charset=utf-8',
    'Test - Response headers Failed'
  )
  assert.equal(response.body, '{"msg":"Hello World"}', "Test - / - Response Data Failed")
  console.log('Tests for route "/", statusCode[OK], headers[OK], response[OK]')

  // inject request for route /cards
  const responseCards = await app.inject({
    method: 'GET',
    url: '/cards'
  })

  // make some assertions
  assert.equal(responseCards.statusCode, 200, "Test - /cards - Response Code Failed")
  assert.equal(
    responseCards.headers['content-type'],
    'application/json; charset=utf-8',
    'Test - Response headers Failed'
  )

  let ja = JSON.parse(responseCards.body)
  assert(ja instanceof Object, "Test - /cards - Response Data Failed - instanceof")
  assert(ja.length > 0, "Test - /cards - Response Data Failed - length")
  assert(ja[0].hasOwnProperty('id'), "Test - /cards - Response Data Failed - hasOwnProperty(id)")
  assert(ja[0].hasOwnProperty('category'), "Test - /cards - Response Data Failed - hasOwnProperty(category)")
  assert(ja[0].hasOwnProperty('title'), "Test - /cards - Response Data Failed - hasOwnProperty(title)")
  assert(ja[0].hasOwnProperty('price'), "Test - /cards - Response Data Failed - hasOwnProperty(price)")
  console.log('Tests for route "/cards", statusCode[OK], headers[OK], response[OK]')

  // all tests passed
  console.log("All tests passed !!!")
  process.exit(0)
}

test()
