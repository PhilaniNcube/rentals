import { getCarById } from "@/lib/fetchers/cars";
import VehicleDetails from "./_components/vehicle-details";
import { addDays, format } from "date-fns";
import { getWeeklyRentalTimes } from "@/lib/fetchers/rentals";
import VehicleRentalsCalendar from "./_components/vehicle-rentals-calendar";

const CarPage = async ({params:{id}}:{params:{id:number}}) => {

  const { car, error } = await getCarById(id);

  const today = new Date();

  const formatedDate = format(today, "yyyy-MM-dd");


  // use the date-fns libary to get the date 7 days from now
  const nextWeek = addDays(formatedDate, 30);

  const nextWeekFormated = format(nextWeek, "yyyy-MM-dd");


  //concate the two dates to create a date range
  const booking_range = `["${formatedDate} 00:00","${nextWeekFormated} 00:00")`;

  console.log({booking_range});
  const { rentals, error: rentalError } = await getWeeklyRentalTimes(booking_range, id);

  console.log({rentals, rentalError})


  if (error) {
    return <div>{error.message}</div>;
  }


  return (
			<>
				<VehicleDetails car={car} />
        <VehicleRentalsCalendar />
			</>
		);
};
export default CarPage;
