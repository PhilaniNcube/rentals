"use server";
import { signInSchema, signUpSchema } from "@/types/schemas";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function signInAction(prevState: unknown, formData: FormData) {
	const supabase = createClient();

	const validatedFields = signInSchema.safeParse({
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
		};
	}

	const { data, error } = await supabase.auth.signInWithPassword({
		email: validatedFields.data.email,
		password: validatedFields.data.password,
	});

	if (error) {
		return {
			errors: {
				message: error.message,
			},
		};
	}

	revalidatePath("/", "layout");

	return data;
}
