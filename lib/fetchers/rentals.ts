import { createClient } from "@/utils/supabase/server";
import { getCurrentUser } from "./auth";
import { redirect } from "next/navigation";

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


export async function getRentalById(rentalId: number) {

  //create a supabase client
  const supabase = createClient();

  //check if user is authenticated
  const user = getCurrentUser();

  //if user is not authenticated redirect to login page
  if(!user) {
    redirect("/login");
  }

  //get the rental by id
  const { data, error } = await supabase.from('rentals').select('*').eq('id', rentalId).single();

  //if there is an error redirect to the error page
  if(error) {
    redirect(`/rentals/error?message=${error.message}`);
  }

  // the booking period is in tstzrange format, parse it to get the start and end time and date
	const booking_period = (data.booking_period as string)
		.replace(/[\[\]"]+/g, "")
		.split(",");

    const start_time = booking_period[0].split(" ")[1];
    const end_time = booking_period[1].split(" ")[1];

  //return the rental data
  return {
    rental: {
      ...data,
      date: booking_period[0],
      start_time: start_time,
       end_time: end_time,
    }
  }


}
