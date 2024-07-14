import { createClient } from "@/utils/supabase/service";
import type { NextApiRequest } from "next";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
  typescript: true,
});



export async function POST(req: Request) {
     const rawBody = await req.text();
     req.headers.get("Stripe-Signature");
  const stripe_signature = req.headers.get("Stripe-Signature") as string;

  if(!stripe_signature) {
    return new Response("Invalid Stripe Signature", { status: 400 });
  }

  let stripeEvent: Stripe.Event;

  try {
			stripeEvent = stripeClient.webhooks.constructEvent(
				JSON.stringify(rawBody),
				stripe_signature,
				process.env.STRIPE_ENPOINT_SECRET,
			);
			console.log(stripeEvent);
		} catch (error) {
      console.error(`Webhook Error: ${JSON.stringify(error)}`);
			let errorMessage = "An unknown error occurred";
			if (typeof error === "object" && error !== null && "message" in error) {
				errorMessage = (error as { message: string }).message;
			}
			return new Response(`Webhook Error: ${errorMessage}`, { status: 400 });
		}





  const supabase = createClient();
  const stripeRes = await req.json();

  const event = stripeRes;


  const eventType = stripeEvent.type;

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



const buffer = (req: NextApiRequest) => {
	return new Promise<Buffer>((resolve, reject) => {
		const chunks: Buffer[] = [];

		req.on("data", (chunk: Buffer) => {
			chunks.push(chunk);
		});

		req.on("end", () => {
			resolve(Buffer.concat(chunks));
		});

		req.on("error", reject);
	});
};
