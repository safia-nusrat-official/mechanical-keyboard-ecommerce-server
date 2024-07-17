import { z } from 'zod';

export const createProductValidation = z
  .object({
    body: z.object({
      title: z.string(),
      images: z.array(z.string()),
      description: z.string(),
      price: z.number().min(0),
      rating: z.number().min(0),
      brand: z.string(),
      availableQuantity: z.number(),
    }),
  })
  .required();

export const updateProductValidation = z.object({
  body:z.object({
    title: z.string().optional(),
    images: z.array(z.string()).optional(),
    description: z.string().optional(),
    price: z.number().optional(),
    rating: z.number().optional(),
    brand: z.string().optional(),
    availableQuantity: z.number().optional(),
  })
})
