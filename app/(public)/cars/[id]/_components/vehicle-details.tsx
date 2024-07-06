import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import type { CarWithImages } from "@/lib/fetchers/cars";
import { formatCurrency } from "@/lib/utils";
import type { Database } from "@/types/supabase";
import { AirVentIcon, AntennaIcon, BluetoothIcon, Calendar, CircuitBoard, FuelIcon, PlaneTakeoff, TicketIcon, TowerControlIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
								</div>
								<div className="flex flex-col gap-2">
									<div className="flex items-center gap-2">
										<Calendar className="w-6 h-6 text-primary" />
										<span>{car.year}</span>
									</div>
									<div className="flex items-center gap-2">
										<CircuitBoard className="w-6 h-6 text-primary" />
										<span>{car.license_plate}</span>
									</div>
									<div className="flex items-center gap-2">
										<AntennaIcon className="w-6 h-6 text-primary" />
										<span>Automatic Transmission</span>
									</div>
								</div>
								<div className="flex flex-col gap-2 min-[400px]:flex-row">
									<Link
										href="#"
										className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium transition-colors rounded-md shadow bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
										prefetch={false}
									>
										Book Now
									</Link>
									<span className="text-lg font-semibold">{formatCurrency(car.rental_price_per_hour)}</span>
								</div>
							</div>
						</div>
					</div>
				</section>


			</main>
		);
};
export default VehicleDetails;
