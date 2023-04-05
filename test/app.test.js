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

/** 
 * @description test for build app
 * */
const test = async () => {
  const app = build()

  // inject request
  const response = await app.inject({
    method: 'GET',
    url: '/'
  })

  // make some assertions
  assert.equal(response.statusCode, 200, "Test - Response Code Failed")
  assert.equal(
    response.headers['content-type'],
    'application/json; charset=utf-8',
    'Test - Response headers Failed'
  )
  assert.equal(response.body, '{"msg":"hello world"}', "Test - Response Data Failed")
  
  // all tests passed
  console.log("All tests passed !!!")
}

test()
