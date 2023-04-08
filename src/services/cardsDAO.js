/**
 * @file Service for cards database operations
 * @author Bruno Leonardo - Tico)
 * @version 1.0.0
 * @license MIT
 * 
 */

'use strict'

const fp = require('fastify-plugin')
const dt_fns = require('date-fns')

const configuration = require('../config/configuration')

const CardsDAO = (db) => {
  const createCard = async (category, title, price) => {
    let now = new Date()
    let formatedDate = dt_fns.format(now, 'yyyy-MM-dd hh:mm:ss')

    const [rows, fields] = await db.execute(
      'INSERT INTO cards (category, title, price, create_time) VALUES (?, ?, ?, ?);',
      [category, title, price, formatedDate]
    )

    if (configuration.DEBUG_MODE) { console.log(category, title, price, rows) }
    return rows[0]
  }

  const getAllCards = async () => {
    const [rows, fields] = await db.execute(
      'SELECT id, category, title, price FROM cards;'
    )

    if (configuration.DEBUG_MODE) { console.log(rows) }
    return rows
  }

  const getCardById = async (id) => {
    const [rows, fields] = await db.execute(
      'SELECT id, category, title, price FROM cards WHERE id = ?',
      [id]
    )
 
    if (configuration.DEBUG_MODE) { console.log(rows) }
    return rows[0]
  }

  const updateCard = async (id, category, title, price) => {
    const [rows, fields] = await db.execute(
      'UPDATE cards SET category = ?, title = ?, price = ? WHERE id = ?;',
      [category, title, price, id]
    )

    if (configuration.DEBUG_MODE) { console.log(id, category, title, price, rows) }
    return rows[0]
  }

  const deleteCard = async (id) => {
    const [rows, fields] = await db.execute(
      'DELETE FROM cards WHERE id = ?',
      [id]
    )

    if (configuration.DEBUG_MODE) { console.log(id, rows) }
    return rows[0]
  }

  return { createCard, getAllCards, getCardById, updateCard, deleteCard }
}

module.exports = fp((fastify, options, next) => {
  fastify.decorate('cardsDAO', CardsDAO(fastify.db))
  next()
})
