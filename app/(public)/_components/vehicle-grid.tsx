
import { getCars } from "@/lib/fetchers/cars";
import VehicleCard from "./vehicle-card";


const VehicleGrid = async () => {

  	const { cars, error } = await getCars();

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
			<div className="container">
				<div className="@container">
					<div className="grid @sm:grid-col-2 @lg:grid-cols-3 @sm:gap-4 @lg:gap-8">
						{cars.map((car) => (
							<VehicleCard key={car.id} car={car} />
						))}
					</div>
				</div>
			</div>
		);
};
export default VehicleGrid;
