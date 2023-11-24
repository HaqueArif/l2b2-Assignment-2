import { TUser } from './user.interface'
import UserModel from './user.model'

const createUserIntoDB = async (user: TUser) => {
  const result = await UserModel.create(user)
  return result
}

const getAllUserFromDB = async () => {
  const result = await UserModel.find()
  return result
}

const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId })
  return result
}

const updateUserInfoDB = async (userId: number, updatedUserData: TUser) => {
  const result = await UserModel.findOneAndUpdate({ userId }, updatedUserData, {
    new: true,
  })
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserInfoDB,
}
