"use client"

import { signUpAction } from "@/actions/auth/sign-up-action";
import SubmitButton from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/types/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";

const page = () => {

   const [pending, startTransition] = useTransition();

			const form = useForm<z.infer<typeof signUpSchema>>({
				resolver: zodResolver(signUpSchema),
				reValidateMode: "onChange",
				mode: "onBlur",
			});

			const formAction = async (formData: FormData) => {
				startTransition(async () => {
					const result = await signUpAction(null, formData);

					if ("errors" in result) {
						if ("message" in result.errors) {
							toast(result.errors.message, {
								duration: 8000,
								position: "top-center",
							});
						}

						return;
					}

					toast("Please check your email to verify your account", {
						duration: 5000,
						position: "top-center",

					});

				});
			};

			return (
				<main className="container">
					<div className="h-[calc(100vh - 100px)] w-full flex items-center justify-center py-12">
						<Card>
							<CardContent className="sm:max-w-[425px]">
								<CardHeader>
									<CardTitle>Create your account</CardTitle>
									<CardDescription>
										Enter your details to create a new account.
									</CardDescription>
								</CardHeader>
								<Form {...form}>
									<form action={formAction}>
										<div className="grid gap-4 py-4">
											<div className="grid gap-2 md:grid-cols-2">
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
															<Input
																type="password"
																placeholder=""
																{...field}
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
										<CardFooter>
											<SubmitButton className="w-full">Sign Up</SubmitButton>
										</CardFooter>
										<div className="mt-2">
											<p>
												Already have an account?{" "}
												<Link href="/login" className="font-medium underline">
													Login instead
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
