import express from 'express'
import controller from '../controllers/slimes.js'

const router = express.Router()
router.get('/', controller.getItems)
router.get('/:id', controller.getItemByID)
router.post('/', controller.createItem)
router.delete('/:id', controller.deleteItem)
router.patch('/:id', controller.updateItem)

export default router