"use server";
import { signUpSchema } from "@/types/schemas";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";


export async function signUpAction(prevState: unknown, formData: FormData) {
  const supabase = createClient();

  const validatedFields = signUpSchema.safeParse({
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    phone: formData.get("phone") as string,
  });

  if (!validatedFields.success) {
    return {
					errors: validatedFields.error.flatten().fieldErrors,
				};
  }


  const { data, error } = await supabase.auth.signUp({
    email: validatedFields.data.email,
    password: validatedFields.data.password,
    options:{
      emailRedirectTo: "/verify-email",
      data: {
        first_name: validatedFields.data.first_name,
        last_name: validatedFields.data.last_name,
        phone: validatedFields.data.phone,
      }
    }
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
