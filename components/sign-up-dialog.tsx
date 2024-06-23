"use client";

import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import SubmitButton from "./submit-button";
import { signUpSchema } from "@/types/schemas";
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
import { signUpAction } from "@/actions/auth/sign-up-action";
import { toast } from "sonner";
import { X, XIcon } from "lucide-react";
import SignIn from "./login-dialog";
import Link from "next/link";

const SignUp = () => {
	const [open, setOpen] = useState(false);

  const [pending, startTransition] = useTransition();

   const form = useForm<z.infer<typeof signUpSchema>>({
				resolver: zodResolver(signUpSchema),
        reValidateMode: "onChange",
        mode: "onBlur",
			});

      const formAction = async(formData:FormData) => {
        startTransition(async () => {
          const result = await signUpAction(null, formData);

          if('errors' in result) {

            if('message' in result.errors) {
              toast(result.errors.message, {
															duration: 8000,
															position: "top-center",
															action: (
																<Button
																	type="button"
																	variant="outline"
																	onClick={() => setOpen(false)}
																>
																	Close
																</Button>
															),
														});
            }

            return;
          }

          toast("Please check your email to verify your account", {
            duration: 8000,
            position: "top-center",
            action: <Button type="button" variant="outline" onClick={() => setOpen(false)}>Close</Button>,

          })
          // setOpen(false);
        });

      }



	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					Sign Up
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create your account</DialogTitle>
					<DialogDescription>
						Enter your details to create a new account.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form action={formAction}>
						<div className="grid gap-4 py-4">
							<div className="grid grid-cols-2 gap-2">
								<FormField
									control={form.control}
									name="first_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>First Name</FormLabel>
											<FormControl>
												<Input placeholder="John" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="last_name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Last Name</FormLabel>
											<FormControl>
												<Input placeholder="Doe" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type="email" placeholder="" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Phone</FormLabel>
										<FormControl>
											<Input type="tel" placeholder="" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" placeholder="" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<DialogFooter>
							<SubmitButton className="w-full">Sign Up</SubmitButton>
						</DialogFooter>
						<div className="mt-2">
							<p>
								Already have an account? <Link href="/login" className="font-medium underline">Login instead</Link>
							</p>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
export default SignUp;
