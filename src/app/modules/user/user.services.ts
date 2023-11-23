import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
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

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
};
