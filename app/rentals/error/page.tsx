/**
 * v0 by Vercel.
 * @see https://v0.dev/t/gEu7CPKKaTI
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import { getRentalById } from "@/lib/fetchers/rentals";
import { formatCurrency } from "@/lib/utils";
import { CircleCheckIcon, CrossIcon } from "lucide-react";
import Link from "next/link";

export default async function RentalError({
	searchParams,
}: { searchParams: { rental_id: string } }) {
	const { rental } = await getRentalById(Number(searchParams.rental_id));

	// parse the booking period to get the start and end time and date

	return (
		<div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-background sm:px-6 lg:px-8">
			<div className="max-w-md mx-auto text-center">
				<CrossIcon className="w-16 h-16 mx-auto text-red-500" />
				<h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
					Payment Failed
				</h1>
				<p className="mt-4 text-muted-foreground">
					Your payment of{" "}
					<span className="font-semibold">
						{formatCurrency(rental.total_price)}
					</span>{" "}
					could not be processed
				</p>
				<div className="mt-6 space-y-4">
					<Card className="p-4">
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="grid gap-2">
								<div className="flex items-center justify-between">
									<span>Date</span>
									<span>{rental.date.split(" ")[0]}</span>
								</div>
								<div className="flex items-center justify-between">
									<span>Start Time</span>
									<span>{rental.start_time.split("+")[0]}</span>
								</div>
								<div className="flex items-center justify-between">
									<span>End Time</span>
									<span>{rental.end_time.split("+")[0]}</span>
								</div>
							</div>
						</CardContent>
						<CardFooter>
							<div className="flex items-center justify-between">
								<span className="font-semibold">Total</span>
								<span className="ml-2 font-semibold">
									{formatCurrency(rental.total_price)}
								</span>
							</div>
						</CardFooter>
					</Card>
				</div>
				<div className="mt-6">
					<Link
						href="/"
						className="inline-flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-md shadow-sm bg-primary text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
						prefetch={false}
					>
						Back To Home
					</Link>
				</div>
			</div>
		</div>
	);
}

