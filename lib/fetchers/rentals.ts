import { createClient } from "@/utils/supabase/server";

export async function getRentals() {
  const supabase = createClient();
  const { data, error } = await supabase.from('rentals').select('*');
  if (error) {
    return {
      error: {
        message: error.message,
        code: error.code,
      }
    }
  }
  return {
    rentals: data,
  }
}
