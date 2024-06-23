"use server";

import { createCarSchema } from "@/types/schemas";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createCarAction(prevState:unknown, formData:FormData) {

  const supabase = createClient();

  const validatedFields = createCarSchema.safeParse({
    make: formData.get("make"),
    model: formData.get("model"),
    year: formData.get("year"),
    rental_price_per_hour: formData.get("rental_price_per_hour"),
    license_plate: formData.get("license_plate"),
    description: formData.get("description"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { data, error } = await supabase.from("cars").insert([
			{
				make: validatedFields.data.make,
				model: validatedFields.data.model,
				year: validatedFields.data.year,
				rental_price_per_hour: validatedFields.data.rental_price_per_hour,
				license_plate: validatedFields.data.license_plate,
				description: validatedFields.data.description,
				availability: true,
			},
		]);

  console.log({data, error})

  if (error) {
    return {
      errors: {
        message: error.message,
      }
    }
  }

  revalidatePath('/cars', "layout")
  revalidatePath('/dashboard/cars', "layout")

  return {
    data: data,
  }

}
