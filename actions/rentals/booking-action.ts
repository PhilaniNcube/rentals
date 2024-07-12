"use server";

import { createBookingSchema } from "@/types/schemas";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";
import stripe from "stripe";

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY)

export async function bookingAction (formData:FormData) {
const supabase = createClient();

const car_id = formData.get("car_id");
const date = formData.get("date");
const start_time = formData.get("start_time");
const end_time = formData.get("end_time");

const {data: {user}} = await supabase.auth.getUser();

if(!user) {
  redirect("/login");
}

const validatedFields = createBookingSchema.safeParse({
  car_id: Number(car_id),
  date: date,
  start_time: start_time,
  end_time: end_time,
});

if (!validatedFields.success ) {
    console.log(validatedFields.error.errors)
    redirect(`/cars/error?message=${validatedFields.error.errors[0].message}`)
  };

  const startTimeNumber = Number.parseInt(validatedFields.data.start_time.split(":")[0]);
  const endTimeNumber = Number.parseInt(validatedFields.data.end_time.split(":")[0]);

  const carData = await supabase.from('cars').select('rental_price_per_hour').eq('id', validatedFields.data.car_id).single();

  if (carData.error) {
    console.log("Car Error", carData.error)
    redirect(`/cars/error?message=${carData.error.message}`)
  }

  const price = carData.data.rental_price_per_hour;

  //calculate the total price of the booking
  const total_price = (endTimeNumber - startTimeNumber) * price;

  //create a string combining the date, start_time and end_time in tstzrange format
  const booking_range = `["${validatedFields.data.date} ${validatedFields.data.start_time}", "${validatedFields.data.date} ${validatedFields.data.end_time}")`;

  const {data, error} = await supabase.from('rentals').insert([{
    booking_period: booking_range,
    car_id: Number(validatedFields.data.car_id),
    total_price: total_price,
    profile_id: user.id,
  }]).single();

  if (error) {
    console.log("Rental", error)
    redirect(`/cars/error?message=${error.message}`)

  }


  const session = await stripeClient.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'gbp',
          product_data: {
            name: 'Car Rental',
          },
          unit_amount: total_price * 100,
        },
        quantity: 1,
      }
    ],
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: 'http://localhost:3000/rentals/success',
    cancel_url: 'http://localhost:3000/rentals/error',
  })

  redirect(`${session.url}`)

  return {
    data: data,
  }


}
