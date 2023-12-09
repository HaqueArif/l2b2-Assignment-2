import { TOrder, TUser } from './user.interface'
import User from './user.model'
import bcrypt from 'bcrypt'
import config from '../../config'

const createUserIntoDB = async (user: TUser) => {
  if (await User.isUserExists(user.userId)) {
    throw new Error('this userId or username or email already used')
  }
  const result = await User.create(user, { select: { password: 0 } })
  return result
}

const getAllUserFromDB = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  )
  return result
}

const getSingleUserFromDB = async (userId: number) => {
  const existsUser = await User.isUserExists(userId)
  if (!existsUser) {
    throw new Error('user is not found')
  }
  const result = await User.findOne({ userId })
  return result
}

const updateUserInfoDB = async (userId: number, updatedUserData: TUser) => {
  const existsUser = await User.isUserExists(userId)
  if (!existsUser) {
    throw new Error('user is not found')
  }

  if (updatedUserData.password) {
    updatedUserData.password = await bcrypt.hash(
      updatedUserData.password,
      Number(config.bcrypt_salt_rounds),
    )
  }
  const result = await User.findOneAndUpdate({ userId }, updatedUserData, {
    select: { password: 0 },
    new: true,
  })
  return result
}

const deleteUserFromDB = async (userId: number) => {
  const existsUser = await User.isUserExists(userId)
  if (!existsUser) {
    throw new Error('user is not found')
  }
  const result = await User.updateOne({ userId }, { isDeleted: true })
  return result
}

const addNewProductIntoDB = async (userId: number, product: TOrder) => {
  const existsUser = await User.isUserExists(userId)
  if (!existsUser) {
    throw new Error('user is not found')
  }
  const result = await User.updateOne(
    { userId },
    { $addToSet: { orders: product } },
  )
  return result
}

const getOrdersInfoFromDb = async (userId: number) => {
  const existsUser = await User.isUserExists(userId)
  if (!existsUser) {
    throw new Error('user is not found')
  }
  const result = await User.findOne({ userId }, { orders: 1, _id: 0 })
  return result
}

const getUserTotalOrderAmount = async (userId: number) => {
  const existsUser = await User.isUserExists(userId)
  if (!existsUser) {
    throw new Error('user is not found')
  }

  const result = await User.aggregate([
    { $unwind: '$orders' },
    { $match: { userId } },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    {
      $project: { _id: 0, totalPrice: 1 },
    },
  ])

  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserInfoDB,
  deleteUserFromDB,
  addNewProductIntoDB,
  getOrdersInfoFromDb,
  getUserTotalOrderAmount,
}
