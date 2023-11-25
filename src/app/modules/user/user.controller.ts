import { Request, Response } from 'express'
import { UserServices } from './user.service'
import userValidationSchema from './user.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const { User: userData } = req.body

    const zodparsedData = userValidationSchema.parse(userData)

    const result = await UserServices.createUserIntoDB(zodparsedData)

    //sending response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
    })
  }
}

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB()
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId

    const result = await UserServices.getSingleUserFromDB(parseFloat(id))

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      })
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error,
    })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    const updatedUserData = req.body

    const result = await UserServices.updateUserInfoDB(
      parseFloat(id),
      updatedUserData,
    )

    if (!result) {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      })
    } else {
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
      })
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
      error: {
        code: 500,
        description: error.message || 'Internal Server Error',
      },
    })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId

    const result = await UserServices.deleteUserFromDB(parseFloat(userId))

    // Sending response
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
      error: {
        code: 500,
        description: error.message || 'Internal Server Error',
      },
    })
  }
}

const addNewProduct = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId
    const newProduct = req.body.product

    const result = await UserServices.addNewProductIntoDB(
      parseFloat(userId),
      newProduct,
    )

    // Sending response
    if (result.acknowledged === true) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: null,
      })
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Internal Server Error',
      error: {
        code: 500,
        description: error.message || 'Internal Server Error',
      },
    })
  }
}

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  addNewProduct,
}
