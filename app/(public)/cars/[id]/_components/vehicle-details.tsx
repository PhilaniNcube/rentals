
import type { CarWithImages } from "@/lib/fetchers/cars";
import { formatCurrency } from "@/lib/utils";

import {  Calendar, CogIcon } from "lucide-react";
import Image from "next/image";


const VehicleDetails = ({car}:{car:CarWithImages}) => {



  return (
			<main className="flex-1">
				<section className="w-full py-12">
					<div className="container px-4 md:px-6">
						<div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
							<div>
								<Image
									src={car.car_images[0].image_url}
									width="800"
									height="500"
									alt="Vehicle"
									className="object-cover mx-auto overflow-hidden aspect-video rounded-xl"
								/>
							</div>
							<div className="flex flex-col justify-center space-y-4">
								<div className="space-y-2">
									<small className="text-muted-foreground">{car.make}</small>
									<h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
										{car.model}
									</h1>
									<p className="max-w-[600px] text-muted-foreground md:text-xl">
									{car.description}
									</p>
                  <p className="">When you book this vehicle it will come with a chauffer to drive you around to give the best possible experience.  Our chauffers will be well dressed and make sure your travel needs will be caterd to.</p>
								</div>
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-2">
										<Calendar className="w-6 h-6 text-primary" />
										<span>Model Year: {car.year}</span>
									</div>

									<div className="flex items-center gap-2">
										<CogIcon className="w-6 h-6 text-primary" />
										<span>Automatic Transmission</span>
									</div>
								</div>
								<div className="flex flex-col gap-2 min-[400px]:flex-row">
									<span className="text-lg font-bold md:text-2xl">{formatCurrency(car.rental_price_per_hour)}</span>
								</div>
							</div>
						</div>
					</div>
				</section>


			</main>
		);
};
export default VehicleDetails;
