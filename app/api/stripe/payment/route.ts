import { createClient } from "@/utils/supabase/service";
import type { StripeElementChangeEvent } from "@stripe/stripe-js";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import stripe from "stripe";

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request, res: Response) {

  const reqHeaders = headers();

  console.log({reqHeaders});
// get the stripe signature from the headers
  const stripe_signature = reqHeaders.get('stripe-signature') as string;

  //verify the stripe signature

  const supabase = createClient();
  const stripeRes = await req.json();



  try {
		const	verifiedEvent = stripeClient.webhooks.constructEvent(
				stripeRes,
				stripe_signature,
				process.env.STRIPE_ENPOINT_SECRET,
			);

      console.log({verifiedEvent});


		} catch (error: unknown) {
			// Explicitly type the error as unknown
			// Log the error or handle it as needed
			if (error instanceof Error) {
				// Now TypeScript knows `error` is an Error object, and you can access its properties safely
				console.error(`Error while verifying Stripe event: ${error.message}`);
			} else {
				// Handle cases where the caught object is not an Error instance
				console.error("An unexpected error occurred", error);
			}
			return NextResponse.json(
				{ error: "Invalid Stripe Signature" },
				{ status: 400, statusText: "Invalid Stripe Signature" },
			);
		}





  const event = stripeRes;

  const eventType = event.type;

		if(eventType === "checkout.session.completed") {

		  const rental_id = Number(event.data.object.metadata.rental_id);
		  const payment_status = event.data.object.payment_status;

		  const {data, error} = await supabase.from('rentals').update({
		    status: payment_status === 'paid' ? 'completed' : 'pending',
		    payment_id: event.data.object.payment_intent,
		  }).eq('id', rental_id).single();

		  return NextResponse.json({ received: true, data: data, error: error });

		}

		return NextResponse.json({ event: event });






}
