import { Request, Response } from 'express'
import { UserServices } from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.User

    const result = await UserServices.createUserIntoDB(user)

    //sending response
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: JSON.parse(error.message)[0].message,
      error: {
        code: 400,
        description: JSON.parse(error.message)[0].message,
      },
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
    res.status(404).json({
      success: false,
      message: JSON.parse(error.message)[0].message,
      error: {
        code: 404,
        description: JSON.parse(error.message)[0].message,
      },
    })
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId

    const result = await UserServices.getSingleUserFromDB(parseFloat(id))

    if (!result) {
      // If user not found, return a 404 response
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      })
    } else {
      // If user found, return a 200 response with the user data
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      })
    }
  } catch (error: any) {
    // Handle other errors (e.g., database error)
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
}
