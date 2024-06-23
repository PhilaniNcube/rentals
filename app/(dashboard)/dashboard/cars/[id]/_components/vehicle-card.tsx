import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import type { CarWithImages } from "@/lib/fetchers/cars";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const VehicleCard = ({ car }: { car: CarWithImages }) => {
	return (
		<div>
			<div>
				<div className="overflow-hidden bg-white rounded-lg shadow-md">
					{car.car_images.length === 0 ? (
						<div className="object-cover w-full h-48 bg-slate-400" />
					) : (
						<img
							src={car.car_images[0].image_url}
							alt={car.license_plate}
							width={600}
							height={400}
							className="object-cover w-full h-48"
						/>
					)}

					<div className="p-4">
						<h2 className="mb-1 text-lg font-semibold">
							{car.model}
							<span className="ml-2 text-xs text-slate-500">/{car.make}</span>
						</h2>
						<div className="flex items-center justify-between">
							<span className="text-xl font-bold">
								{formatCurrency(car.rental_price_per_hour)}/hour
							</span>
							<Link href={`/dashboard/cars/${car.id}`}>
								<Button>View Car</Button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default VehicleCard;
