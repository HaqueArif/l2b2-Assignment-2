import { z } from 'zod'

const fullNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  lastName: z.string(),
})

const addressValidationSchema = z.object(
  {
    street: z.string(),
    city: z.string(),
    country: z.string(),
  },
  {
    invalid_type_error: 'Address must be an object',
  },
)

const orderValidationSchema = z.object({
  productName: z.string({
    invalid_type_error: 'ProductName must be a string',
  }),
  price: z.number({
    invalid_type_error: 'Price must be a number',
  }),
  quantity: z.number({
    invalid_type_error: 'Quantity must be a number',
  }),
})

const userValidationSchema = z.object({
  userId: z.number({
    invalid_type_error: 'userId must be a number',
  }),
  username: z.string({
    required_error: 'username is required',
    invalid_type_error: 'username must be a string',
  }),
  password: z.string({
    required_error: 'password is required',
    invalid_type_error: 'password must be a string',
  }),
  fullName: fullNameValidationSchema,
  age: z.number({
    required_error: 'age is required',
    invalid_type_error: 'age must be a number',
  }),
  email: z
    .string({
      required_error: 'email is required',
      invalid_type_error: 'email must be a string',
    })
    .refine((value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value), {
      message: 'Invalid email format',
    }),
  isActive: z.boolean({
    required_error: 'isActive is required',
    invalid_type_error: 'isActive must be a boolean',
  }),
  hobbies: z.array(
    z.string({
      required_error: 'hobbies is required',
      invalid_type_error: 'hobbies must be a string',
    }),
  ),
  address: addressValidationSchema,
  orders: z.array(orderValidationSchema).optional(),
  isDeleted: z.boolean().optional(),
})

export default userValidationSchema
