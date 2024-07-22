const ServicesCards = () => {
  return (
			<section className="w-full py-12 md:py-16 bg-muted">
				<div className="container grid grid-cols-1 gap-8 px-4 md:grid-cols-2 lg:grid-cols-3 md:px-6">
					<div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg hover:-translate-y-2 hover:shadow-xl">
						<div className="p-4 bg-background">
							<h3 className="text-xl font-bold">Impeccable Fleet</h3>
							<p className="mt-2 text-muted-foreground">
								Our collection of high-end vehicles is maintained to the highest
								standards of luxury and performance.
							</p>
						</div>
					</div>
					<div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg hover:-translate-y-2 hover:shadow-xl">
						<div className="p-4 bg-background">
							<h3 className="text-xl font-bold">Professional Chauffeurs</h3>
							<p className="mt-2 text-muted-foreground">
								Our experienced chauffeurs are trained to provide exceptional
								service, discretion, and local knowledge.
							</p>
						</div>
					</div>
					<div className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg hover:-translate-y-2 hover:shadow-xl">
						<div className="p-4 bg-background">
							<h3 className="text-xl font-bold">Personalized Service</h3>
							<p className="mt-2 text-muted-foreground">
								We tailor each experience to your specific needs and
								preferences, ensuring a truly unforgettable journey.
							</p>
						</div>
					</div>
				</div>
			</section>
		);
};
export default ServicesCards;
