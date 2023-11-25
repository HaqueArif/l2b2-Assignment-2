import { z } from 'zod'

const fullNameValidationSchema = z.object({
  firstName: z.string().refine((value) => /^[A-Z][a-z]*$/.test(value), {
    message: 'First name should start with a capital letter',
  }),
  lastName: z.string().refine((value) => /^[A-Z][a-z]*$/.test(value), {
    message: 'Last name should start with a capital letter',
  }),
})

const addressValidationSchema = z.object(
  {
    street: z.string({
      required_error: 'Street is required',
      invalid_type_error: 'Street must be a string',
    }),
    city: z.string({
      required_error: 'City is required',
      invalid_type_error: 'City must be a string',
    }),
    country: z.string({
      required_error: 'Country is required',
      invalid_type_error: 'Country must be a string',
    }),
  },
  {
    required_error: 'Address is required',
    invalid_type_error: 'Address must be an object',
  },
)

const orderValidationSchema = z.object({
  productName: z.string({
    required_error: 'ProductName is required',
    invalid_type_error: 'ProductName must be a string',
  }),
  price: z.number({
    required_error: 'Price is required',
    invalid_type_error: 'Price must be a number',
  }),
  quantity: z.number({
    required_error: 'Quantity is required',
    invalid_type_error: 'Quantity must be a number',
  }),
})

const userValidationSchema = z.object({
  userId: z.number({
    required_error: 'userId is required',
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
    .email(),
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
})

export default userValidationSchema
