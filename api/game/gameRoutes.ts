import express from 'express'
import gameController from './gameController'

const router = express.Router()

router.get('/:id', gameController.getGameById)

export default router
