import { getCars } from "@/lib/fetchers/cars";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import VehicleCard from "./[id]/_components/vehicle-card";
import { Separator } from "@/components/ui/separator";

const CarsPage = async () => {
	const { cars, error } = await getCars();


	if (error) {
		return <div>{error.message}</div>;
	}

	if (cars.length === 0) return <div>No cars available</div>;

	return (
		<div className="">
			<h1 className="text-3xl font-semibold">Cars</h1>
      <Separator className="mt-4 mb-6" />
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{cars.map((car) => (
					<VehicleCard key={car.id} car={car} />
				))}
			</div>
		</div>
	);
};
export default CarsPage;
