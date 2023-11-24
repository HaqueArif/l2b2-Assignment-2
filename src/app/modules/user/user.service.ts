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

const getSingleUserFromDB = async (id: number) => {
  const result = await UserModel.findOne({ id })
  return result
}

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
}
