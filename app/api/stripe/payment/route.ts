import { createClient } from "@/utils/supabase/service";
import type { StripeElementChangeEvent } from "@stripe/stripe-js";
import { NextResponse } from "next/server";
import stripe from "stripe";

const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request, res: Response) {

  const supabase = createClient();

  const stripeRes = await req.json();

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
