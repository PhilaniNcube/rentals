"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Arrow } from "@radix-ui/react-dropdown-menu";
import { eachDayOfInterval, endOfMonth, endOfWeek, format, isEqual, isThisMonth, isToday, startOfMonth, startOfToday } from "date-fns";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";

const VehicleRentalsCalendar = () => {

  const today = startOfToday();

  const days = eachDayOfInterval({start:startOfMonth(today), end:endOfWeek(endOfMonth(today))})

  console.log(days)

  const [selectedDay, setselectedDay] = useState(today);


  return (
			<div className="flex w-full max-w-6xl gap-8 p-6 mx-auto sm:p-8">
				<div className="w-full sm:w-3/4">
					<div className="py-2 rounded-lg shadow-lg bg-background">
						<div className="flex items-center justify-between px-6 py-4 border-b">
							<div className="text-lg font-semibold">
								{format(today, "MMMM yyyy")}
							</div>
							<div className="flex items-center gap-2">
								<Button variant="ghost">
									<ArrowLeftIcon />
								</Button>
								<Button variant="ghost">
									<ArrowRightIcon />
								</Button>
							</div>
						</div>
						<div className="grid grid-cols-7 gap-2">
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
							{days.map((day) => (
								<Button
									key={day.getTime()}
									type="button"
									size="lg"
									variant="ghost"
                  onClick={() => setselectedDay(day)}
									className={cn(
										isEqual(day,selectedDay) && "text-white",
										!isEqual(day,selectedDay) && isToday(day) && "text-indigo-600 outline",
										!isEqual(day,selectedDay) &&
											!isToday(day) &&
											isThisMonth(day) &&
											"text-gray-900",
										!isEqual(day,selectedDay) &&
											!isToday(day) &&
											!isThisMonth(day) &&
											"text-gray-400",
										isEqual(day,selectedDay) && isToday(day) && "bg-indigo-600",
										isEqual(day,selectedDay) && !isToday(day) && "bg-gray-900",
										!isEqual(day,selectedDay) && "",
										(isToday(day) || isEqual(day,selectedDay)) && "font-semibold",
										"px-4 py-3 text-sm w-10 h-10 hover:bg-blue-700 hover:text-white flex items-center justify-center rounded-full transition-colors duration-200 ease-in-out",
									)}
								>
									<time
										dateTime={format(day, "yyyy-MM-dd")}
										className="flex items-center justify-center w-full h-full text-sm font-medium text-center"
									>
										{format(day, "d")}
									</time>
								</Button>
							))}
						</div>
					</div>
				</div>
				<div className="w-full sm:w-1/4">
					<Card className="h-full">
						<CardHeader>
							<CardTitle>Schedule for June 16, 2024</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col gap-4">
							<div className="flex items-center justify-between">
								<div className="text-sm font-medium">8:00 AM</div>
								<div className="text-sm text-muted-foreground">
									Morning Meeting
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-sm font-medium">10:00 AM</div>
								<div className="text-sm text-muted-foreground">
									Coffee Break
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-sm font-medium">12:00 PM</div>
								<div className="text-sm text-muted-foreground">
									Lunch with Team
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-sm font-medium">2:00 PM</div>
								<div className="text-sm text-muted-foreground">
									Design Review
								</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-sm font-medium">4:00 PM</div>
								<div className="text-sm text-muted-foreground">Client Call</div>
							</div>
							<div className="flex items-center justify-between">
								<div className="text-sm font-medium">6:00 PM</div>
								<div className="text-sm text-muted-foreground">End of Day</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
};
export default VehicleRentalsCalendar;
