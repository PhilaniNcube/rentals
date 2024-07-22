import Image from "next/image";
import Link from "next/link";

const ServicesHero = () => {
  return (
			<section className="w-full py-12">
				<div className="container px-4 md:px-6">
					<div className="grid items-center gap-6 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_650px]">
						<div className="flex flex-col justify-center space-y-4">
							<div className="space-y-2">
								<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl lg:text-6xl">
									Our Chauffeured Services
								</h1>
								<p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
									Experience the pinnacle of luxury travel with our meticulously
									curated chauffeured services.
								</p>
							</div>
							<div className="flex flex-col gap-2 min-[400px]:flex-row">
								<Link
									href="/cars"
									className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors rounded-md shadow bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
									prefetch={false}
								>
									Book Now
								</Link>
							</div>
						</div>
						<Image
							src="/images/range.jpg"
							alt="Range Rover"
							width={1023}
							height={514}
							className="object-cover object-center mx-auto overflow-hidden aspect-video rounded-xl sm:w-full"
						/>
					</div>
				</div>
			</section>
		);
};
export default ServicesHero;
