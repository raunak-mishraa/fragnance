import { z } from "zod";

export const insertProductSchema = z.object({
  brandId: z.string().min(1, "Brand is required"),
  flavor: z.string().min(1, "Flavor is required"),
  mrp: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid MRP"),
  description: z.string().min(1, "Description is required"),
  category: z.string().min(1, "Category is required"),
  size: z.string().min(1, "Size is required"),
  type: z.string().min(1, "Type is required"),
  fragranceNotes: z.object({
    topNotes: z.string().optional(),
    middleNotes: z.string().optional(),
    baseNotes: z.string().optional(),
  }),
  images: z
    .array(
      z.object({
        url: z.string().min(1, "Image URL is required"),
        altText: z.string().optional(),
      })
    )
    .optional(),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;

export interface Product extends InsertProduct {
  id: string;
  createdAt: string;
  updatedAt: string;
  brand: {
    id: string;
    name: string;
  };
  images: {
    id: string;
    url: string;
    altText: string;
    perfumeId: string;
  }[];
  fragrance: {
    id: string;
    topNotes: string;
    middleNotes: string;
    baseNotes: string;
    perfumeId: string;
  };
}