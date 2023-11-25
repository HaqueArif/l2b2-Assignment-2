import { TUser } from './user.interface'
import User from './user.model'

const createUserIntoDB = async (user: TUser) => {
  const trueUser = await User.isUserExists(user.userId)
  if (!trueUser) {
    throw new Error('User already exists')
  }
  const result = await User.create(user)

  return result
}

const getAllUserFromDB = async () => {
  const result = await User.find()
  return result
}

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId })
  return result
}

const updateUserInfoDB = async (userId: number, updatedUserData: TUser) => {
  const trueUser = await User.isUserExists(userId)
  if (!trueUser) {
    throw new Error('User is not found')
  }
  const result = await User.findOneAndUpdate({ userId }, updatedUserData, {
    new: true,
  })
  return result
}

const deleteUserFromDB = async (userId: number) => {
  const result = await User.findOneAndDelete({ userId })
  return result
}
export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserInfoDB,
  deleteUserFromDB,
}
