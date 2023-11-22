import { Schema } from 'mongoose';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({});
