import { Card, CardContent } from "@/components/ui/card";

const ServicesTransport = () => {
  return (
			<section className="py-12 md:py-16">
				<div className="container md:px-6">
					<h2 className="text-3xl font-bold text-center">
						Our Chauffeured Services
					</h2>
					<div className="grid items-center gap-6 lg:grid-cols-2 mt-6 lg:gap-12 xl:grid-cols-[1fr_650px]">
						<Card>
							<CardContent className="p-2">
								<h3 className="text-xl font-bold">Airport Transportation</h3>
								<p className="mt-2 text-muted-foreground">
									Relax and unwind after a long flight as our chauffeur handles
									your luggage and navigates you through traffic. We monitor
									flight schedules to ensure prompt pick-up and drop-off,
									regardless of delays or changes.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-2">
								<h3 className="text-xl font-bold">Business Travel</h3>
								<p className="mt-2 text-muted-foreground">
									Focus on your work while we take care of the logistics. Our
									chauffeurs are familiar with major business districts and can
									provide efficient transportation to meetings, conferences, and
									corporate events.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-2">
								<h3 className="text-xl font-bold">Special Occasions</h3>
								<p className="mt-2 text-muted-foreground">
									Celebrate your wedding, anniversary, or milestone in style.
									Our luxury vehicles and professional chauffeurs will make your
									special day even more memorable.
								</p>
							</CardContent>
						</Card>
						<Card>
							<CardContent className="p-2">
								<h3 className="text-xl font-bold">City Tours and Excursions</h3>
								<p className="mt-2 text-muted-foreground">
									Discover the hidden gems of your destination with our
									knowledgeable chauffeurs. We can create customized itineraries
									or recommend popular attractions and points of interest.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		);
};
export default ServicesTransport;
