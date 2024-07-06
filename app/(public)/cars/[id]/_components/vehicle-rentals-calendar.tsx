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

type RentalInfo = { car_id: number; booking_period: string }[];

const VehicleRentalsCalendar = ({
	car,
	rentals,
}: { car: CarWithImages; rentals: RentalInfo }) => {

	const searchParams = useSearchParams();

  const searchDate = searchParams.get("date") || new Date();

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

  // parse the start time and end time of the rental from the booking_period which has the following string format ["2022-02-01 10:00:00 - 2022-02-01 11:00:00")

  const startTimes = rentals.map((rental) => {
    const [start] = rental.booking_period.split(",");
    console.log(start);
  });

	const colStartClasses = [
		"",
		"col-start-2",
		"col-start-3",
		"col-start-4",
		"col-start-5",
		"col-start-6",
		"col-start-7",
	];

	const time = [
		{
			hour: "10:00",
		},
		{
			hour: "11:00",
		},
		{
			hour: "12:00",
		},
		{
			hour: "13:00",
		},
		{
			hour: "14:00",
		},
		{
			hour: "15:00",
		},
		{
			hour: "16:00",
		},
		{
			hour: "17:00",
		},
		{
			hour: "18:00",
		},
		{
			hour: "19:00",
		},
		{
			hour: "20:00",
		},
		{
			hour: "21:00",
		},
		{
			hour: "22:00",
		},
		{
			hour: "23:00",
		},
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
							{time.map((item) => {

                const formatedSelectedDay = `${format(selectedDay, "yyyy-MM-dd")} ${item.hour}`;



                // check if formatedSelectedDay is in the rentals array

                // if it is, then the time slot is booked
                const isBooked = rentals.some((rental) => {
                 return rental.booking_period.includes(formatedSelectedDay);
                });

                console.log(isBooked, formatedSelectedDay);

                if (isBooked) {
                  return (
                    <div
                      key={item.hour}
                      className="px-4 py-3 text-center text-gray-900 bg-gray-200 cursor-not-allowed"
                    >
                      <p className="line-through">{item.hour}</p>
                    </div>
                  );
                }


                return <TimeSlot item={item} car={car} date={selectedDay} key={item.hour} />;
              })}
						</div>
					</ScrollArea>
				</div>
			</div>
		</div>
	);
};
export default VehicleRentalsCalendar;
