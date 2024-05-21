import {z} from "zod";

const inventoryvalidation = z.object({
  quantity: z.number().positive(),
  inStock: z.boolean().default(false),
}).required();
const variantValidation = z.object({
  value: z.string().min(1).trim().max(36),
  type: z.string().min(1).trim().max(36),
}).required();

export const productValidation = z.object({
  name: z.string().trim().max(30),
  description: z.string(),
  price: z.number().positive(),
  category: z.string().min(1).trim(),
  tags: z.array(z.string()).nonempty(),
  variants: z.array(variantValidation),
  inventory: inventoryvalidation,
}).required();
