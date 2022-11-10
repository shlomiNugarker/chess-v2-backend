import express from 'express'

import userController from './userController'

const router = express.Router()

router.get('/', userController.getUsers)
router.get('/:id', userController.getUser)
router.put('/:id', userController.updateUser)
router.post('/', userController.addUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

// router.delete('/:id', deleteUser)

export default router
