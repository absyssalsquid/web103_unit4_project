import express from 'express'
import controller from '../controllers/options.js'

const router = express.Router()
router.get('/textures', controller.getTextures)
router.get('/colors', controller.getColors)
router.get('/sizes', controller.getSizes)
router.get('/toppings', controller.getToppings)
router.get('/micas', controller.getMicas)
router.get('/glitters', controller.getGlitters)
router.get('/scents', controller.getScents)

export default router