import express from 'express'
import gameController from './gameController'

const router = express.Router()

router.get('/:id', gameController.getStateById)
router.put('/:id', gameController.updateState)
router.post('/', gameController.addState)

export default router
