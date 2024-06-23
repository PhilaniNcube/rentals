"use server";

import { updateCarSchema } from "@/types/schemas";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";


export async function updateCarAction(prevState: unknown, formData: FormData, id: number) {
	const supabase = createClient();

	const validatedFields = updateCarSchema.safeParse({
		make: formData.get("make"),
		model: formData.get("model"),
		year: formData.get("year"),
		rental_price_per_hour: formData.get("rental_price_per_hour"),
		license_plate: formData.get("license_plate"),
		description: formData.get("description"),
    id: formData.get("id"),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { data, error } = await supabase.from("cars").update({
		make: validatedFields.data.make,
		model: validatedFields.data.model,
		year: validatedFields.data.year,
		rental_price_per_hour: validatedFields.data.rental_price_per_hour,
		license_plate: validatedFields.data.license_plate,
		description: validatedFields.data.description,
	}).eq("id", id);

	console.log({ data, error });

	if (error) {
		return {
			errors: {
				message: error.message,
			},
		};
	}

	revalidatePath("/cars", "layout");
	revalidatePath("/dashboard/cars", "layout");

	return {
		data: data,
	};
}
