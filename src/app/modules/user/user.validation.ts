import { z } from 'zod';

const FullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(20, { message: 'First name cannot be more than 20 characters' })
    .regex(/^[A-Z][a-z]*$/, {
      message:
        'First name must start with a capital letter and contain only letters',
    }),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .max(20, { message: 'Last name cannot be more than 20 characters' })
    .regex(/^[A-Z][a-z]*$/, {
      message:
        'Last name must start with a capital letter and contain only letters',
    }),
});

const AddressValidationSchema = z.object({
  street: z.string().min(1, { message: 'Street is required' }),
  city: z.string().min(1, { message: 'City is required' }),
  country: z.string().min(1, { message: 'Country is required' }),
});

const OrderValidationSchema = z.object({
  productName: z.string().min(1, { message: 'Product name is required' }),
  price: z.number().min(0, { message: 'Price must be a non-negative number' }),
  quantity: z
    .number()
    .min(1, { message: 'Quantity must be a positive number' }),
});

const UserValidationSchema = z.object({
  userId: z.number().positive({ message: 'User ID must be a positive number' }),
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .max(20, { message: 'Username cannot be more than 20 characters' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .max(20, { message: 'Password cannot be more than 20 characters' }),
  fullName: FullNameValidationSchema,
  age: z.number().positive({ message: 'Age must be a positive number' }),
  email: z.string().email({ message: 'Invalid email format' }),
  isActive: z.boolean(),
  hobbies: z.array(z.string()),
  address: AddressValidationSchema,
  orders: z.array(OrderValidationSchema).optional(),
});

export default UserValidationSchema;
