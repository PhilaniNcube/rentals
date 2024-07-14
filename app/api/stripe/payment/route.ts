import { createClient } from "@/utils/supabase/service";
import type { StripeElementChangeEvent } from "@stripe/stripe-js";
import { NextResponse } from "next/server";
import stripe from "stripe";

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request, res: Response) {

  const endpointSecret = process.env.STRIPE_ENPOINT_SECRET;

  const supabase = createClient();

  const stripeRes = await req.json();

  const sig = req.headers.get("Stripe-Signature") || "";

  console.log("Signature", sig);

		// biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
		let event;

		try {
			event = stripeClient.webhooks.constructEvent(stripeRes, sig, endpointSecret) || null;
		} catch (err) {
			return NextResponse.json({ error: "Not authorized"});
		}

  // const event = stripeRes;

  const eventType = event.type;

		if(eventType === "checkout.session.completed") {

		 const rental_id = Number(event.data.object.metadata?.rental_id);
			const payment_status = event.data.object.payment_status;

			// Adjusted to handle PaymentIntent type correctly
			const payment_id =
				typeof event.data.object.payment_intent === "string"
					? event.data.object.payment_intent
					: event.data.object.payment_intent?.id;

			const { data, error } = await supabase
				.from("rentals")
				.update({
					status: payment_status === "paid" ? "completed" : "pending",
					payment_id: payment_id, // Use the adjusted payment_id
				})
				.eq("id", rental_id)
				.single();

			return NextResponse.json({ received: true, data: data, error: error });

		}

		return NextResponse.json({ event: event });






}
