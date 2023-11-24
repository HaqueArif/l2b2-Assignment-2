import { Schema, model, connect } from 'mongoose'
import { TAddress, TFullName, TOrder, TUser } from './user.interface'

const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required'],
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last name is required'],
  },
})
const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
    trim: true,
    required: [true, 'Street address is required'],
  },
  city: {
    type: String,
    trim: true,
    required: [true, 'City name is required'],
  },
  country: {
    type: String,
    trim: true,
    required: [true, 'Country name is required'],
  },
})
const ordersSchema = new Schema<TOrder>({
  productName: {
    type: String,
    trim: true,
    required: [true, 'Product name is required'],
  },
  price: {
    type: Number,
    trim: true,
    required: [true, 'Price is required'],
  },
  quantity: {
    type: Number,
    trim: true,
    required: [true, 'Quantity is required'],
  },
})

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: {
    type: fullNameSchema,
    required: [true, 'Name name is required'],
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    default: [],
    required: [true, 'Hobby is required'],
  },
  address: {
    type: addressSchema,
    required: [true, 'Address is required'],
  },
  orders: {
    type: [ordersSchema],
  },
})

const UserModel = model<TUser>('User', userSchema)

export default UserModel
