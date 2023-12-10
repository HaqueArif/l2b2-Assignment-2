import express from 'express'
import { UserController } from './user.controller'

const router = express.Router()

//create user
router.post('/', UserController.createUser)
//get all users
router.get('/', UserController.getAllUsers)
//get single or specific user by userId
router.get('/:userId', UserController.getSingleUser)
//update user or user info
router.put('/:userId', UserController.updateUser)
//delete user
router.delete('/:userId', UserController.deleteUser)
//user orders
router.put('/:userId/orders', UserController.addNewProduct)
//get user orders
router.get('/:userId/orders', UserController.getSingleUserOrders)
// get total order amount
router.get(
  '/:userId/orders/total-price',
  UserController.getUserTotalOrderAmount,
)
export const UserRoutes = router
