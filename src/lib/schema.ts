import { z } from "zod";

export const insertProductSchema = z.object({
  brandId: z.string().min(1, "Brand is required"),
  flavor: z.string().min(1, "Flavor is required"),
  mrp: z.number().min(0, "MRP must be at least 0"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  size: z.string().min(1, "Size is required"),
  type: z.string().min(1, "Type is required"),
  fragranceNotes: z.object({
    topNotes: z.string().optional(),
    middleNotes: z.string().optional(),
    baseNotes: z.string().optional(),
  }),
  images: z.array(z.string()).optional(),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;

export interface Product extends InsertProduct {
  id: string;
  createdAt: string;
  updatedAt: string;
}
