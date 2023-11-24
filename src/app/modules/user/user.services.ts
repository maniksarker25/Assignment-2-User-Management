import { TOrder, TUser } from './user.interface';
import { User } from './user.model';

// create a new user
const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('This user already exists');
  }
  const result = await User.create(userData);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { _id, ...withoutId } = result.toObject();
  return withoutId;
};
// get all users
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
// get single user
const getSingleUserFromDB = async (userId: number) => {
  const result = await User.findOne(
    { userId },
    { password: 0, _id: 0, orders: 0 },
  );
  return result;
};

// update user ----------------
const updateUserInDB = async (userId: number, updatedUserData: TUser) => {
  const result = await User.findOneAndUpdate(
    { userId: userId },
    updatedUserData,
    { new: true, projection: { password: 0, _id: 0, orders: 0 } },
  );
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
    { orders: 1, _id: 0 },
  );
  if (result) {
    return result;
  } else {
    return "Don't have any orders";
  }
};

//  Calculate Total Price of Orders for a Specific User
const calculateTotalPriceForOrderInDB = async (userId: number) => {
  const result = await User.aggregate([
    {
      $match: {
        userId: { $eq: Number(userId) },
        orders: { $exists: true, $ne: [] },
      },
    },
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
  if (result.length > 0) {
    return { totalPrice: result[0].totalPrice };
  } else {
    return { totalPrice: 0 };
  }
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
