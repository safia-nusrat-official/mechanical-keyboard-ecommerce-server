import {z} from "zod";

const inventoryvalidation = z.object({
  quantity: z.number().positive(),
  inStock: z.boolean().default(false),
});
const variantValidation = z.object({
  value: z.string().min(1).trim().max(36),
  type: z.string().min(1).trim().max(36),
});

export const productValidation = z.object({
  name: z.string().trim().max(30),
  description: z.string(),
  price: z.number().positive(),
  category: z.string().min(1).trim(),
  tags: z.array(z.string()).nonempty(),
  variants: z.array(variantValidation.required()),
  inventory: inventoryvalidation.required(),
}).required();


const updatedInventoryvalidation = z.object({
  quantity: z.number().positive().optional(),
  inStock: z.boolean().default(false).optional(),
});
const updatedVariantValidation = z.object({
  value: z.string().min(1).trim().max(36).optional(),
  type: z.string().min(1).trim().max(36).optional(),
});

export const updatedProductValidation = z.object({
  name: z.string().trim().max(30).optional(),
  description: z.string().optional(),
  price: z.number().positive().optional(),
  category: z.string().min(1).trim().optional(),
  tags: z.array(z.string()).optional(),
  variants: z.array(updatedVariantValidation).optional(),
  inventory: updatedInventoryvalidation.optional(),
})