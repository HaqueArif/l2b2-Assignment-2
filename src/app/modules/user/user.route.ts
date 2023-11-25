import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

//create user
router.post('/create-user', UserController.createUser)
//get all users
router.get('/', UserController.getAllUsers)
//get single or specific user by userId
router.get('/:userId', UserController.getSingleUser)
//update user or user info
router.put('/:userId', UserController.updateUser)
//delete user
router.delete('/:userId', UserController.deleteUser)

export const UserRoutes = router
