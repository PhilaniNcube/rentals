import { getCarById } from "@/lib/fetchers/cars";
import VehicleDetails from "./_components/vehicle-details";
import { addDays, format } from "date-fns";
import { getWeeklyRentalTimes } from "@/lib/fetchers/rentals";
import VehicleRentalsCalendar from "./_components/vehicle-rentals-calendar";

const CarPage = async ({params:{id}, searchParams}:{params:{id:number}, searchParams: {date:string}}) => {

  const { car, error } = await getCarById(id);
  const today = searchParams.date || new Date();
  const formatedDate = format(today, "yyyy-MM-dd");

  const nextWeek = addDays(formatedDate, 30);

  const nextWeekFormated = format(nextWeek, "yyyy-MM-dd");


  //concate the two dates to create a date range
  const booking_range = `["${formatedDate} 00:00","${nextWeekFormated} 00:00")`;






  const { rentals } = await getWeeklyRentalTimes(booking_range, id);

  const typedRentals = rentals.map((rental) => ({
			...rental,
			booking_period: rental.booking_period as string, // Type assertion here
		}));


  if (error) {
    return <div>{error.message}</div>;
  }


  return (
			<>
				<VehicleDetails car={car} />
				<VehicleRentalsCalendar car={car} rentals={typedRentals} />
			</>
		);
};
export default CarPage;
