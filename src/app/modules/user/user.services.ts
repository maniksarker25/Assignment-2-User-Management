import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('This user already exists');
  }
  const result = await User.create(userData);
  return result;
};
const getAllUserFromDB = async () => {
  const result = await User.find(
    {},
    {
      _id: 0,
      username: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    },
  );
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }, { password: 0, _id: 0 });
  return result;
};

// update user ----------------
const updateUserInDB = async (userId: number, updatedUserData: TUser) => {
  const result = await User.updateOne({ userId: userId }, updatedUserData);
  return result;
};
// delete user -----------------------

const deleteUserFromDB = async (userId: number) => {
  const result = await User.deleteOne({ userId });
  return result;
};

// add new products in orders--------
const addNewProductInOrdersInDB = async (userId: number, product: TOrder) => {
  const existingUser = await User.findOne({ userId });
  let updatedUserWithProduct;
  if (existingUser?.orders && Array.isArray(existingUser.orders)) {
    updatedUserWithProduct = await User.findOneAndUpdate(
      { userId },
      { $push: { orders: product } },
      { new: true },
    );
  } else {
    updatedUserWithProduct = await User.findOneAndUpdate(
      { userId },
      { $addToSet: { orders: product } },
      { new: true },
    );
  }
  return updatedUserWithProduct;
};

// get all  orders for a specific user -----------------
const getAllOrderForSpecificUserFromDB = async (userId: number) => {
  const result = await User.findOne(
    {
      $and: [{ userId }, { orders: { $exists: true, $ne: [] } }],
    },
    { orders: 1 },
  );
  if (result) {
    return result;
  } else {
    return "Don't have any orders";
  }
};

//  Calculate Total Price of Orders for a Specific User
const calculateTotalPriceForOrderInDB = async (userId: number) => {
  const totalPrice = await User.aggregate([
    { $match: { userId: userId, orders: { $exists: true, $ne: [] } } },
    { $unwind: '$orders' },
    {
      $group: {
        _id: '$_id',
        totalPrice: {
          $sum: { $multiply: ['$orders.price', '$orders.quantity'] },
        },
      },
    },
    { $project: { _id: 0, totalPrice: 1 } },
  ]);
  return totalPrice;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  deleteUserFromDB,
  updateUserInDB,
  addNewProductInOrdersInDB,
  getAllOrderForSpecificUserFromDB,
  calculateTotalPriceForOrderInDB,
};
