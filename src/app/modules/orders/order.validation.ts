import { z } from 'zod';

const dateValidation = z.string().refine((date) => {
    const dateRegex = /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-20\d{2}$/
    return dateRegex.test(date)
},
{
    message: `Invalid date format. Expected date format: 'DD-MM-YYYY'`,
})
const emailValidation = z.string().refine(
    (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        return emailRegex.test(value)
    },
    {
        message: "Please provide a valid email such as: example@email.com",
    }
)
export const orderValidation = z.object({
  body: z.object({
    date: dateValidation,
    paymentMethod: z.enum(["cash", "stripe"]),
    status: z.enum(['delivered', 'pending', 'cancelled']),
    name: z.string(),
    phone: z.string(),
    address: z.string(),
    email: emailValidation,
    orderedProducts: z.array(z.object({
        productId: z.string(),
        orderedQuantity:z.number()
    })),
    totalPrice: z.number(),
    totalOrderedQuantity: z.number(),
  }),
}).required();
