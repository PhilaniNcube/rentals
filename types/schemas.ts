import { z } from "zod";

export const signUpSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string(),
});


export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});


export const createCarSchema = z.object({
  make: z.string(),
  model: z.string(),
  year: z.coerce.number(),
  rental_price_per_hour: z.coerce.number(),
  license_plate: z.string(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }).max(1000, {
    message: "Description must be at most 1000 characters",
  }),
});

export const updateCarSchema = z.object({
  make: z.string().optional(),
  model: z.string().optional(),
  year: z.coerce.number().optional(),
  rental_price_per_hour: z.coerce.number().optional(),
  license_plate: z.string().optional(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }).max(1000, {
    message: "Description must be at most 1000 characters",
  }).optional(),
})

export type TimeRange = `["${string}","${string}")`
