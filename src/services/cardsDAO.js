const fp = require('fastify-plugin')

const CardsDAO = (db) => {
  const createCard = async (category, title, price) => {
    const [rows, fields] = await db.execute(
      'INSERT INTO cards (category, title, price) VALUES (?, ?, ?);',
      [category, title, price]
    )

    return rows
  }

  const getAllCards = async () => {
    const [rows, fields] = await db.execute(
      'SELECT id, category, title, price FROM cards;'
    )
    return rows
  }

  const getCardById = async (id) => {
    const [rows, fields] = await db.execute(
      'SELECT id, category, title, price FROM cards WHERE id = ?',
      [id]
    )
    return rows
  }

  const updateCard = async (id, category, title, price) => {
    const [rows, fields] = await db.execute(
      'UPDATE cards SET category = ?, title = ?, price = ? WHERE id = ?;',
      [category, title, price, id]
    )
    return rows
  }

  const deleteCard = async (id) => {
    const [rows, fields] = await db.execute(
      'DELETE FROM cards WHERE id = ?',
      [id]
    )
    return rows
  }

  return { createCard, getAllCards, getCardById, updateCard, deleteCard }
}

module.exports = fp((fastify, options, next) => {
  fastify.decorate('cardsDAO', CardsDAO(fastify.db))
  next()
})
