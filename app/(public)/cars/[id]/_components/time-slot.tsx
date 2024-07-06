import {
	Dialog,
	DialogHeader,
	DialogContent,
	DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { CarWithImages } from "@/lib/fetchers/cars";
import { createBookingSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

const TimeSlot = ({item, date, car}:{item:{hour:string}, date:Date, car:CarWithImages}) => {

    const router = useRouter();


  	const [pending, startTransition] = useTransition();

			const form = useForm<z.infer<typeof createBookingSchema>>({
				resolver: zodResolver(createBookingSchema),
				reValidateMode: "onChange",
				mode: "onBlur",
			});

      const setSearchValue = (value: string) => {
        startTransition(() => {
          router.push(`/cars/${car.id}?time=${value}&date=${format(date, "yyyy-MM-dd")}`)
        });
      };

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
							<form>
								<FormField
									control={form.control}
									name="car_id"
									render={({ field }) => (
										<FormItem className="hidden">

											<FormControl>
												<Input type="hidden" placeholder="shadcn" {...field} />
											</FormControl>
										</FormItem>
									)}
								/>
							</form>
						</Form>
					</DialogContent>
				</Dialog>
			);
};
export default TimeSlot;
