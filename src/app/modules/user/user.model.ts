import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrder, TUser } from './user.interface';

// schema for full name -----------------
const fullNameSchema = new Schema<TFullName>({
  fistName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
    maxlength: [20, 'First name can not be more then 20 character'],

    // costume validation ------------------------
    validate: {
      validator: function (value: string) {
        const capitalizedString =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return capitalizedString === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
    maxlength: [20, 'Last name can not be more then 20 character'],
    // costume validation ------------------------
    validate: {
      validator: function (value: string) {
        const capitalizedString =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return capitalizedString === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
});

// schema for address -------------

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    required: [true, 'Street is required'],
  },
  city: {
    type: String,
    required: [true, 'City is required'],
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
  },
});

// schema for order
const orderSchema = new Schema<TOrder>({
  productName: {
    type: String,
    required: [true, 'Product name is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
  },
});

// user schema ---------------------------
const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'UserId is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    maxlength: [20, 'Username can not be more then 20 character'],
    validate: {
      validator: function (value: string) {
        const lowercaseString = value.toLowerCase();
        return lowercaseString === value;
      },
      message: '{VALUE} is not in lowercase format',
    },
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    maxlength: [20, 'Password can not be more then 20 character'],
  },
  fullName: {
    type: fullNameSchema,
    required: [true, 'Full Name is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: [String],
  address: {
    type: addressSchema,
    required: [true, 'address is required'],
  },
  orders: {
    type: orderSchema,
  },
});

export const User = model<TUser>('user', userSchema);
