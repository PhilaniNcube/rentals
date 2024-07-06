import { createClient } from "@/utils/supabase/server";

export type CarWithImages = {
  id: number;
  make: string;
  model: string;
  year: number;
  car_images: {
    id: number;
    image_url: string;
  }[];
  license_plate: string;
  rental_price_per_hour: number;
  description: string;
}

export async function getCars() {

  const supabase = createClient();

  const { data, error } = await supabase.from('cars').select(`*, car_images(
    id,
    image_url
    )`);



  if (error) {
    return {
      error: {
        message: error.message,
        code: error.code,
      }
    }
  }

  return {
    cars: data,
  }

}


export async function getCarById(id: number) {
  const supabase = createClient();

  const { data, error } = await supabase.from('cars').select(`*, car_images(
    id,
    image_url
    )`).eq('id', id).single();

  if (error) {
    return {
      error: {
        message: error.message,
        code: error.code,
      }
    }
  }

  return {
    car: data,
  }
}
