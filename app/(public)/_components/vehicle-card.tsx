import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { CarWithImages } from "@/lib/fetchers/cars";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type VehicleCardProps = {
  car: CarWithImages
};

const VehicleCard = ({car}:VehicleCardProps) => {
  return (
			<Card>
				<Image
					src={car.car_images[0].image_url}
					alt={car.make}
					width={300}
					height={200}
					className="object-cover w-full h-48 rounded-t-md"
				/>
				<div>
					<div className="px-4 pt-3">
						<h3 className="text-xl font-medium md:text-2xl">
							{car.make} {car.model}
						</h3>
					</div>
					<div className="flex justify-between px-4 pb-4">
						<div className=" text-slate-500">
							<div>
								<span className="text-sm font-semibold">Price:</span>{" "}
								<span>{formatCurrency(car.rental_price_per_hour)}/hour</span>
							</div>
							<div>
								<span className="text-sm font-semibold">Year:</span>{" "}
								<span>{car.year}</span>
							</div>
						</div>
						<Link href={`/cars/${car.id}`}>
							<Button>Book Now</Button>
						</Link>
					</div>
				</div>
			</Card>
		);
};
export default VehicleCard;
