const controller = require('../controllers/todos')
const validate = require('../controllers/todos.validate')
const express = require('express')
const router = express.Router()

const trimRequest = require('trim-request')

/*
 * Route todos
 */

/*
 * Route ambil semua todo
 */
router.get('/semua', controller.ambilSemuaTodo)

/*
 * Get items route
 * Route ambil todo bisa dengan filter
 */
router.get('/', trimRequest.all, controller.ambilTodoFilter)

/*
 * Route buat todo baru
 */
router.post('/', trimRequest.all, validate.buatTodo, controller.buatTodo)

/*
 * Route ambil todo
 */
router.get('/:id', trimRequest.all, validate.ambilTodo, controller.ambilTodo)

/*
 * Route update todo
 */
router.patch(
  '/:id',
  trimRequest.all,
  validate.updateTodo,
  controller.updateTodo
)

/*
 * Route hapus todo
 */
router.delete('/:id', trimRequest.all, validate.hapusTodo, controller.hapusTodo)

module.exports = router
