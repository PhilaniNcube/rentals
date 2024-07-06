import Link from "next/link";

const HomePageHero = () => {
  return (
			<section className="w-full">
				<div className="container px-4 py-12 md:px-8">
					<div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
						<img
							src="/images/range.jpg"
							width="800"
							height="500"
							alt="Hero"
							className="object-cover mx-auto overflow-hidden aspect-video rounded-xl sm:w-full lg:order-last"
						/>
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter text-balance sm:text-5xl xl:text-6xl/none">
									Rent A Luxury Car For Your Special Occasion
								</h1>{" "}
								<p className="max-w-[600px] text-muted-foreground md:text-xl">
									We offer a wide range of luxury cars for rent. Whether you're
									looking for a car for a special occasion or just want to drive
									in style.
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Link
									href="#"
									className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors rounded-md shadow bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
									prefetch={false}
								>
									Book Now
								</Link>
								<Link
									href="#"
									className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors border rounded-md shadow-sm border-input bg-background hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
									prefetch={false}
								>
									Learn More
								</Link>
							</div>
						</div>
					</div>
					<div className="flex flex-col items-center justify-center w-full py-12 text-center lg:py-16">
						<p className="text-center">Our Promise</p>
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
							Why Choose Service Car Rentals?
						</h2>
						<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
						We offer a full service luxury car rentals. Our cars are always provided with a driver to take to your destination safely and in style. Whether you're looking for a car for a special occasion or just want to drive in style.
						</p>
					</div>
				</div>
			</section>
		);
};
export default HomePageHero;
