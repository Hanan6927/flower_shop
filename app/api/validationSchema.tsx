import { z } from "zod";

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, "category name is required")
    .max(255, "too long category name"),
  description: z.string().min(1, "description is required"),
});

export const createFlowerSchema = z.object({
  category_id: z.number().positive(),
  flower_name: z
    .string()
    .min(1, "category name is required")
    .max(255, "too long category name"),
  description: z.string().min(1, "description is required"),
  price: z.number().min(0).positive(),
  image_url: z.string(),
});

export const createUserSchema = z.object({
  username: z.string().min(1).catch("This must be unique"),
  password: z.string().min(6),
  email: z.string().email(),
  phone: z.string().max(20).optional(),
  address: z.string().optional(),
});

export const updateUserSchema = z.object({
  username: z.string().min(1).optional(),
  password: z.string().min(6).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(20).optional(),
  address: z.string().optional(),
});


// Define a schema for the Order model
export const createOrderSchema = z.object({
  user_id: z.number(),
  total_amount: z.number(),
  status: z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED']),
});

// Define an optional schema for updating orders
export const updateOrderSchema = z.object({
  user_id: z.optional(z.number()),
  total_amount: z.optional(z.number()),
  status: z.optional(z.enum(['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'])),
});

export const createOrderItemSchema = z.object({
  order_id: z.number(),
  flower_id: z.number(),
  quantity: z.number().optional(),
  price: z.number(),
});

export const createCartSchema = z.object({
  user_id: z.number(),
  flower_id: z.number(),
  quantity: z.number().min(1),
});