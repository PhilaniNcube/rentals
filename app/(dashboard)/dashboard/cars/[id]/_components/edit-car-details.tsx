"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { updateCarSchema } from "@/types/schemas";
import type { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SubmitButton from "@/components/submit-button";
import { createCarAction } from "@/actions/cars/create-car-action";
import { useRouter } from "next/navigation";
import type { CarWithImages } from "@/lib/fetchers/cars";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { updateCarAction } from "@/actions/cars/update-car-action";

const EditCarDetails = ({ car }: { car: CarWithImages }) => {
	const [open, setOpen] = useState(false);

	const router = useRouter();

	const [pending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof updateCarSchema>>({
		resolver: zodResolver(updateCarSchema),
    defaultValues: {
      make: car.make,
      model: car.model,
      year: car.year,
      license_plate: car.license_plate,
      rental_price_per_hour: car.rental_price_per_hour,
      description: car.description,
    },
		reValidateMode: "onChange",
		mode: "onBlur",
	});

  	const formAction = async (formData: FormData) => {
				startTransition(async () => {
          formData.append("id", car.id.toString());
					const result = await updateCarAction(null, formData, car.id);

					console.log(result);


					if ("errors" in result) {
						toast(
							"There was an error updating the car. Please try again later",
							{
								duration: 5000,
								position: "top-center",
							},
						);
						return;
					}

					toast("Car updated successfully", {
						duration: 5000,
						position: "top-center",
					});

					setOpen(false);
					router.refresh();
				});
			};

	return (
		<Card>
			<CardContent>
				<CardHeader>
					<CardTitle>Edit Car Details</CardTitle>
				</CardHeader>
				<div>
					<Form {...form}>
						<form action={formAction} className="w-full">
							<div className="@container">
								<div className="grid @md:grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6">
									<FormField
										control={form.control}
										name="model"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Car Model </FormLabel>
												<FormControl>
													<Input
														type="text"
														placeholder="3-series"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="make"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Vehicle Make</FormLabel>
												<FormControl>
													<Input type="text" placeholder="BMW" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>{" "}
									<FormField
										control={form.control}
										name="year"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Vehicle Year</FormLabel>
												<FormControl>
													<Input type="number" placeholder="2022" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>{" "}
									<FormField
										control={form.control}
										name="license_plate"
										render={({ field }) => (
											<FormItem>
												<FormLabel>License plate</FormLabel>
												<FormControl>
													<Input type="text" placeholder="" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>{" "}
									<FormField
										control={form.control}
										name="rental_price_per_hour"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Rental price/hour</FormLabel>
												<FormControl>
													<Input type="number" placeholder="" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="description"
										render={({ field }) => (
											<FormItem className="col-span-1 @lg:col-span-3">
												<FormLabel>Description</FormLabel>
												<FormControl>
													<Textarea placeholder="Description" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
              <Separator className="my-4" />
								<SubmitButton className="w-1/3">Save</SubmitButton>

						</form>
					</Form>
				</div>
			</CardContent>
		</Card>
	);
};
export default EditCarDetails;
