import { Schema, model } from 'mongoose'
import UserModel, { TAddress, TFullName, TOrder, TUser } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../config'

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

const userSchema = new Schema<TUser, UserModel>({
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  fullName: {
    type: fullNameSchema,
    trim: true,
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

userSchema.pre('save', async function (next) {
  // hashing password and save into DB
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  )
  next()
})

// post save middleware
userSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

userSchema.statics.isUserExists = async function (userId: number) {
  const existingUser = await User.findOne({ userId })
  return existingUser
}

const User = model<TUser, UserModel>('User', userSchema)

export default User
