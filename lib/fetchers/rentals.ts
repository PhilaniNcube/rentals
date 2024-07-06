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


export async function getWeeklyRentalTimes(booking_range: string, carId: number) {
  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_rentals_within_range", {
			booking_range: booking_range,
			carid: carId,
		});

    console.log({data, error })

  if(error) {
    return {
      rentals: []
    }
  }

  return {
    rentals: data
  }

}
