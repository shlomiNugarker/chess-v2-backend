import express from 'express'
import chatController from './chatController'

const router = express.Router()

router.get('/:id', chatController.getChatById)
router.post('/', chatController.addChat)
router.put('/:id', chatController.updateChat)

export default router
