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
