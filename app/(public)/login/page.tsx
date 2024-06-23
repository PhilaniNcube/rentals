"use client";

import { signInAction } from "@/actions/auth/sign-in-action";
import { signUpAction } from "@/actions/auth/sign-up-action";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

const page = () => {
	const [pending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		reValidateMode: "onChange",
		mode: "onBlur",
	});

	const formAction = async (formData: FormData) => {
		startTransition(async () => {
			const result = await signInAction(null, formData);

			if ("errors" in result) {
				if ("message" in result.errors) {
					toast(result.errors.message, {
						duration: 8000,
						position: "top-center",
					});
				}

				return;
			}

			toast("You logged in successfully", {
				duration: 5000,
				position: "top-center",
			});
		});
	};

	return (
		<main className="container">
			<div className="h-[calc(100vh - 100px)] w-full flex items-center justify-center py-12 md:py-24">
				<Card>
					<CardContent className="sm:max-w-[425px]">
						<CardHeader>
							<CardTitle>Sign In</CardTitle>
							<CardDescription>
								Log into your account.
							</CardDescription>
						</CardHeader>
						<Form {...form}>
							<form action={formAction}>
								<div className="grid gap-4 py-4">

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
								<CardFooter>
									<SubmitButton className="w-full">Sign In</SubmitButton>
								</CardFooter>
								<div className="mt-2">
									<p>
										Don't have an account?{" "}
										<Link href="/sign-up" className="font-medium underline">
											Sign up instead
										</Link>
									</p>
								</div>
							</form>
						</Form>
					</CardContent>
				</Card>
			</div>
		</main>
	);
};
export default page;
