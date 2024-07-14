import { createClient } from "@/utils/supabase/service";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

type METADATA = {
	rental_id: string;
	payment_status: string;
};

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest, res: Response) {

  const reqHeaders = headers();


  const stripe_signature = reqHeaders.get('stripe-signature') as string;

  const supabase = createClient();
  const stripeRes = await req.json();
  let event: Stripe.Event;

  try {
      const body = await req.text();
		event = stripeClient.webhooks.constructEvent(
			body,
			stripe_signature,
			process.env.STRIPE_ENPOINT_SECRET,
		);

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







  const eventType = event.type;

		if(eventType === "checkout.session.completed") {
      const stripeData = event.data.object;
      const metadata = stripeData.metadata as METADATA;

		  const rental_id = Number(metadata.rental_id);
		  const payment_status = event.data.object.payment_status;

		  const { data, error } = await supabase
					.from("rentals")
					.update({
						status: payment_status === "paid" ? "completed" : "pending",
						payment_id:
							typeof stripeData.payment_intent === "string"
								? stripeData.payment_intent
								: stripeData.payment_intent?.id || "",
					})
					.eq("id", rental_id)
					.single();

		  return NextResponse.json({ received: true, data: data, error: error });

		}

		return NextResponse.json({ event: event });






}



