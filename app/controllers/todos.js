const model = require('../models/todos')
const { matchedData } = require('express-validator')
const utils = require('../middleware/utils')
const db = require('../middleware/db')

/*********************
 * Fungsi private *
 *********************/

/**
 * Ambil semua todo dari database
 */
const ambilSemuaTodoDariDB = async () => {
  return new Promise((resolve, reject) => {
    model.find(
      {},
      '-createdAt',
      {
        sort: {
          updateAt: 1
        }
      },
      (err, items) => {
        if (err) {
          reject(utils.buildErrObject(422, err.message))
        }
        resolve(items)
      }
    )
  })
}

/********************
 * Fungsi privat *
 ********************/

/**
 * Ambil semua todo dipangginl dari route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.ambilSemuaTodo = async (req, res) => {
  try {
    res.status(200).json(await ambilSemuaTodoDariDB())
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Ambil todo berdasarkan query dipanggil dari route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.ambilTodoFilter = async (req, res) => {
  try {
    const query = await db.checkQueryString(req.query)
    res.status(200).json(await db.getItems(req, model, query))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Ambil todo dipanggil dari route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.ambilTodo = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.getItem(id, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Update todo dipanggil dari route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.updateTodo = async (req, res) => {
  try {
    console.log(req.params)
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.updateItem(id, model, req))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Buat todo baru dipanggil dari route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.buatTodo = async (req, res) => {
  try {
    req = matchedData(req)
    res.status(201).json(await db.createItem(req, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}

/**
 * Hapus todo dipanggil dari route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */
exports.hapusTodo = async (req, res) => {
  try {
    req = matchedData(req)
    const id = await utils.isIDGood(req.id)
    res.status(200).json(await db.deleteItem(id, model))
  } catch (error) {
    utils.handleError(res, error)
  }
}
