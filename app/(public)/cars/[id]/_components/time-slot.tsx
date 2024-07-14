import {
	Dialog,
	DialogHeader,
	DialogContent,
	DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { CarWithImages } from "@/lib/fetchers/cars";
import { createBookingSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { Button } from "@/components/ui/button";
import { bookingAction } from "@/actions/rentals/booking-action";

  	const time_options = [
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

type TimeSlotItem = {
	hour: string;
	count: number;
	index?: number; // Making index optional
};

const TimeSlot = ({
	item,
	date,
	car,
	bookedTimes,
}: {
	item: TimeSlotItem;
	date: Date;
	car: CarWithImages;
	bookedTimes: (number | undefined)[];
}) => {
	const router = useRouter();

	const [pending, startTransition] = useTransition();



	const form = useForm<z.infer<typeof createBookingSchema>>({
		resolver: zodResolver(createBookingSchema),
    defaultValues:{
      start_time: item.hour,
      car_id: car.id,
      date: format(date, 'yyyy-MM-dd'),
    },
		reValidateMode: "onChange",
		mode: "onBlur",
	});

	const setSearchValue = (value: string) => {
		startTransition(() => {
			router.push(
				`/cars/${car.id}?time=${value}&date=${format(date, "yyyy-MM-dd")}`,
			);
		});
	};

  	const formAction = async (formData: FormData) => {
				startTransition(async () => {
					const result = await bookingAction(formData);

			});
    }


	return (
		<Dialog>
			<DialogTrigger asChild>
				<div
					className="flex items-center justify-between w-full p-4 border rounded-md cursor-pointer hover:bg-slate-100 border-slate-200"
					onClick={() => setSearchValue(item.hour)}
					onKeyDown={() => setSearchValue(item.hour)}
					key={item.hour}
				>
					<p>{item.hour}</p>
				</div>
			</DialogTrigger>
			<DialogContent aria-describedby="Pick Booking Time">
				<DialogHeader>
					<DialogTitle>
						Book {car.make} {car.model} for {format(date, "yyyy-MM-dd")}
					</DialogTitle>{" "}
				</DialogHeader>
				<Form {...form}>
					<form action={formAction}>
						<Input
							type="hidden"
							name="car_id"
							value={car.id}
							placeholder=""
							defaultValue={car.id}
						/>
						<Input
							type="hidden"
							name="date"
							value={format(date, "yyyy-MM-dd")}
							placeholder=""
						/>

						<FormField
							control={form.control}
							name="start_time"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Start Time</FormLabel>
									<Select
										name="start_time"
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select a start time" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{time_options.map((time) => {
												const isBooked = bookedTimes.includes(time.count);
												if (isBooked) {
													return (
														<SelectItem
															key={time.hour}
															value={time.hour}
															disabled
														>
															{time.hour}
														</SelectItem>
													);
												}
												return (
													<SelectItem key={time.hour} value={time.hour}>
														{time.hour}
													</SelectItem>
												);
											})}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="end_time"
							render={({ field }) => (
								<FormItem className="mt-4">
									<FormLabel>End Time</FormLabel>
									<Select
										name="end_time"
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select an end time" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{time_options.map((time) => {
												//return an array of booked times + 1
												const endTimes = bookedTimes.map((time) => {
													if (time === undefined) {
														return;
													}

													return time + 1;
												});

												const isBooked = endTimes.includes(time.count);
												if (isBooked) {
													return (
														<SelectItem
															key={time.hour}
															value={time.hour}
															disabled
														>
															{time.hour}
														</SelectItem>
													);
												}
												return (
													<SelectItem key={time.hour} value={time.hour}>
														{time.hour}
													</SelectItem>
												);
											})}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" disabled={pending} className="w-1/2 mt-6">
							{pending ? "Booking..." : "Book"}
						</Button>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
export default TimeSlot;
