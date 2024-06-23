"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function uploadImage(formData: FormData) {
  const supabase = createClient();

  const image_url = formData.get("image_url") as string;
  const car_id = formData.get("car_id") as string;

  if(!image_url || !car_id) throw new Error("Invalid form data");

  const {data, error} = await supabase.from('car_images').insert([
    {
      car_id: Number(car_id),
      image_url
    }
  ])

  console.log(data, error);



  revalidatePath("/dashboard/cars");
  return { data };
}
