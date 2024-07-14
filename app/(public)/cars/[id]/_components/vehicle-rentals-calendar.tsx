"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Arrow } from "@radix-ui/react-dropdown-menu";
import { eachDayOfInterval, endOfMonth, endOfWeek, format, isEqual, isThisMonth, isToday, startOfMonth, startOfToday, parse, add, getDay, isSameMonth, isBefore, startOfWeek } from "date-fns";
import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon, PlusIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import TimeSlot from "./time-slot";
import type { CarWithImages } from "@/lib/fetchers/cars";
import Link from "next/link";



type RentalInfo = { car_id: number; start_time: number, end_time:number, duration: number }[];

const VehicleRentalsCalendar = ({
	car,
	rentals,
}: { car: CarWithImages; rentals: RentalInfo }) => {

	const searchParams = useSearchParams();

  const searchDate = searchParams.get("date") || new Date();

  	const time = [
				{
					hour: "10:00",
					count: 10,
				},
				{
					hour: "11:00",
					count: 11,
				},
				{
					hour: "12:00",
					count: 12,
					index: 0,
				},
				{
					hour: "13:00",
					count: 13,
					index: 1,
				},
				{
					hour: "14:00",
					count: 14,
					index: 2,
				},
				{
					hour: "15:00",
					count: 15,
					index: 3,
				},
				{
					hour: "16:00",
					count: 16,
					index: 4,
				},
				{
					hour: "17:00",
					count: 17,
					index: 5,
				},
				{
					hour: "18:00",
					count: 18,
					index: 6,
				},
				{
					hour: "19:00",
					count: 19,
					index: 7,
				},
				{
					hour: "20:00",
					count: 20,
					index: 8,
				},
				{
					hour: "21:00",
					count: 21,
					index: 9,
				},
				{
					hour: "22:00",
					count: 22,
					index: 10,
				},
				{
					hour: "23:00",
					count: 23,
					index: 11,
				},
			];

      // filter any booked times from time array in order to only display the available times
const blocked: number[][] = [];

const filteredTimes = time.filter((item) => {
	const blockedTimes = [];

	// Use a for...of loop to iterate over rentals
	for (const rental of rentals) {
		if (rental.start_time === item.count) {
			blockedTimes.push(rental.start_time);
			for (let i = 1; i < (rental.duration / 60)+1; i++) {
				blockedTimes.push(rental.start_time + i);
			}
		}
	}

  if (blockedTimes.length === 0) {
    return
  }

  blocked.push(blockedTimes);

  // blocked is now an array of arrays of booked times but we want a single array





	const isBooked = rentals.find((rental) => rental.start_time === item.count);

});



const unavailableTimes = blocked.flat();




  const spans = rentals.map(rental => {
    return {
      start: rental.start_time,
      span: rental.duration / 60
    }
  });

   // compare the spans array with and return the arrays that are not equal to the spans array
   const bookedArray = time.map((item) => {
    const isBooked = spans.find(span => span.start === item.count);

   if(isBooked === undefined) {
     return;
   }

    return isBooked;
  })

   //filter the bookedArray to remove the undefined values
  const booked = bookedArray.filter((item) => item !== undefined);



  let bookedTimes = [];

  //each item in the booked array corresponsed to a rental but each rental can span multiple hours so we to get
  bookedTimes = booked.map((item) => {
    const times = [];

    if(item === undefined) {
      return;
    }

    if(item.span === 1) {
      return times.push(item.start);
    }

    for(let i = 0; i < item.span; i++) {
      times.push(item.start + i);
    }

    return times;


  })


  //flatten the bookedTimes array to get a single array of all the booked times
  const bookedTimesArray = bookedTimes.flat();



	const today = startOfToday();
	const [selectedDay, setselectedDay] = useState(today);
	const [currentMonth, setCurrentMonth] = useState(
		format(searchDate, "MMM-yyyy"),
	);
	const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
	const days = eachDayOfInterval({
		start: startOfWeek(firstDayCurrentMonth),
		end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
	});

	const past = isBefore(firstDayCurrentMonth, today);

	function nextMonth() {
		const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
		setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
	}

	function previousMonth() {
		const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
		setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
	}



	const colStartClasses = [
		"",
		"col-start-2",
		"col-start-3",
		"col-start-4",
		"col-start-5",
		"col-start-6",
		"col-start-7",
	];

	return (
		<div className="container flex w-full gap-8 p-6 sm:p-8">
			<div className="w-full sm:w-3/4 max-w-[500px]">
				<div className="py-2 rounded-lg shadow-lg bg-background">
					<div className="flex items-center justify-between px-6 py-4 border-b">
						<div className="text-lg font-semibold">
							{format(firstDayCurrentMonth, "MMMM yyyy")}
						</div>
						<div className="flex items-center gap-2">
							<Button
								disabled={past}
								aria-disabled={past}
								variant="ghost"
								onClick={previousMonth}
							>
								<ArrowLeftIcon />
							</Button>
							<Button variant="ghost" onClick={nextMonth}>
								<ArrowRightIcon />
							</Button>
						</div>
					</div>
					<div className="grid grid-cols-7 gap-2 mb-2 ">
						<div className="px-4 py-3 text-sm font-medium text-center bg-muted/20 text-muted-foreground">
							Sun
						</div>
						<div className="px-4 py-3 text-sm font-medium text-center bg-muted/20 text-muted-foreground">
							Mon
						</div>
						<div className="px-4 py-3 text-sm font-medium text-center bg-muted/20 text-muted-foreground">
							Tue
						</div>
						<div className="px-4 py-3 text-sm font-medium text-center bg-muted/20 text-muted-foreground">
							Wed
						</div>
						<div className="px-4 py-3 text-sm font-medium text-center bg-muted/20 text-muted-foreground">
							Thu
						</div>
						<div className="px-4 py-3 text-sm font-medium text-center bg-muted/20 text-muted-foreground">
							Fri
						</div>
						<div className="px-4 py-3 text-sm font-medium text-center bg-muted/20 text-muted-foreground">
							Sat
						</div>
					</div>
					<div className="grid grid-cols-7 gap-2">
						{days.map((day, dayIdx) => (
							<Link
                prefetch={false}
                href={
                  `/cars/${car.id}?time=${time[0].hour}&date=${format(day, "yyyy-MM-dd")}`
                }
                scroll={false}
								key={day.getTime()}
								className={cn(dayIdx === 0 && colStartClasses[getDay(day)])}
							>
								<Button
									type="button"
									size="lg"
									variant="ghost"
									disabled={isBefore(day, today)}
									onClick={() => {

                    setselectedDay(day)
                  }}
									className={cn(
										isEqual(day, selectedDay) && "text-white",
										!isEqual(day, selectedDay) &&
											isToday(day) &&
											"text-indigo-600 outline",
										!isEqual(day, selectedDay) &&
											!isToday(day) &&
											isSameMonth(day, firstDayCurrentMonth) &&
											"text-gray-900",
										!isEqual(day, selectedDay) &&
											!isToday(day) &&
											!isSameMonth(day, firstDayCurrentMonth) &&
											"text-gray-400",
										isEqual(day, selectedDay) &&
											isToday(day) &&
											"bg-indigo-600",
										isEqual(day, selectedDay) && !isToday(day) && "bg-gray-900",
										!isEqual(day, selectedDay) && "",
										(isToday(day) || isEqual(day, selectedDay)) &&
											"font-semibold",
										"px-4 py-3 text-sm w-10 h-10 hover:bg-blue-700 hover:text-white flex items-center justify-center rounded-full transition-colors duration-200 ease-in-out text-center",
									)}
								>
									<time
										dateTime={format(day, "yyyy-MM-dd")}
										className="flex items-center justify-center w-full h-full text-sm font-medium text-center"
									>
										{format(day, "d")}
									</time>
								</Button>
							</Link>
						))}
					</div>
				</div>
			</div>
			<div className="w-full ">
				<div className="w-full p-6 mx-auto md:p-10">
					<div className="grid grid-cols-[auto_1fr] gap-4 border-b border-muted-foreground/20 mb-6">
						<h1 className="text-2xl font-bold">
							{format(selectedDay, "PPPP")}
						</h1>
					</div>
					<ScrollArea className="h-[200px] w-full">
						<div className="flex flex-col gap-3 text-sm ">
							{time.map((item, idx) => {

                const isBooked = unavailableTimes.includes(item.count);

                if (isBooked) {
                  return (
                    <Button
                      key={item.hour}
                      disabled
                      className="text-muted-foreground"
                      variant="ghost"
                    >
                      {item.hour}
                    </Button>
                  );
                }

                const formatedSelectedDay = `["${format(selectedDay, "yyyy-MM-dd")} ${item.hour}` || `,"${format(selectedDay, "yyyy-MM-dd")} ${item.hour}`;



                return (
																	<TimeSlot
																		item={item}
																		car={car}
																		date={selectedDay}
																		key={item.hour}
																		bookedTimes={unavailableTimes}
																	/>
																);
              })}
						</div>
					</ScrollArea>
				</div>
			</div>
		</div>
	);
};
export default VehicleRentalsCalendar;
