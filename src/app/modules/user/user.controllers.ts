import { Request, Response } from 'express';
import { UserServices } from './user.services';
import UserValidationSchema from './user.validation';
import { User } from './user.model';

const createUser = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const zodValidatedUserData = UserValidationSchema.parse(userData);
    const result = await UserServices.createUserIntoDB(zodValidatedUserData);
    res.status(200).json({
      success: true,
      message: 'User Created Successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUserFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: 'Something went wrong', error: error });
  }
};

// get single user ------

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    if (await User.isUserExists(userId)) {
      const result = await UserServices.getSingleUserFromDB(userId);
      res.status(200).json({
        success: true,
        message: 'User fetched successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

// update user -------------
const updateUser = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    const updatedUserData = req.body;
    if (await User.isUserExists(userId)) {
      const result = await UserServices.updateUserInDB(userId, updatedUserData);
      res.status(200).json({
        success: true,
        message: 'User updated successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};
// delete user -------------
const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId: any = req.params.userId;
    if (await User.isUserExists(userId)) {
      const result = await UserServices.deleteUserFromDB(userId);
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found',
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong',
      error: error,
    });
  }
};

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteUser,
  updateUser,
};
