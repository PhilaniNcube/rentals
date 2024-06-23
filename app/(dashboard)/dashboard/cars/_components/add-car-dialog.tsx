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
import { createCarSchema } from "@/types/schemas";
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

const AddCarDialog = () => {
	const [open, setOpen] = useState(false);

  const router = useRouter();

	const [pending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof createCarSchema>>({
		resolver: zodResolver(createCarSchema),
		reValidateMode: "onChange",
		mode: "onBlur",
	});

	const formAction = async (formData: FormData) => {
		startTransition(async () => {
			const result = await createCarAction(null, formData);

      console.log(result);

			if ("errors" in result) {
				toast("There was an error creating the car. Please try again later", {
					duration: 5000,
					position: "top-center",
				});
				return;
			}

			toast("Car created successfully", {
				duration: 5000,
				position: "top-center",
			});

			setOpen(false);
      router.push("/dashboard/cars");
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="default" size="icon" className="px-3 w-fit">
					<PlusIcon /> Add Car
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[700px]">
				<DialogHeader>
					<DialogTitle>Add a new car</DialogTitle>
					<DialogDescription>Add a new car to the fleet.</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form
						action={formAction}
						className="@container"
					>
						<div className="grid gap-4 @md:grid-cols-2 py-4">
							<FormField
								control={form.control}
								name="model"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Car Model e.g. 3-series</FormLabel>
										<FormControl>
											<Input type="text" placeholder="3-series" {...field} />
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
										<FormLabel>Vehicle Make e.g. BMW</FormLabel>
										<FormControl>
											<Input type="text" placeholder="BMW" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="grid gap-4 @md:grid-cols-3 py-4">
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
							/>

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
							/>
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
						</div>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea placeholder="Description" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<DialogFooter className="flex flex-col mt-3">
							<SubmitButton className="w-full">Save</SubmitButton>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
export default AddCarDialog;
