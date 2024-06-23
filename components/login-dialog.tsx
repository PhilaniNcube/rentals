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
import { Label } from "./ui/label";
import SubmitButton from "./submit-button";
import { signInSchema, signUpSchema } from "@/types/schemas";
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
import { signInAction } from "@/actions/auth/sign-in-action";
import Link from "next/link";

const SignIn = () => {
	const [open, setOpen] = useState(false);

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
						duration: 5000,
						position: "top-center",
					});
				}

				return;
			}

			toast("Sign in successfull", {
				duration: 5000,
				position: "top-center",

			});
			setOpen(false);
		});
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline" size="sm">
					Login
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Login to your account</DialogTitle>
					<DialogDescription>
						Enter your details to sign in to your account.
					</DialogDescription>
				</DialogHeader>
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
						<DialogFooter className="flex flex-col">
							<SubmitButton className="w-full">Sign In</SubmitButton>
						</DialogFooter>
						<div className="mt-2">
							<p>
                Don't have an account?{" "}
								<Link href="/sign-up" className="font-medium underline">
									Sign Up
								</Link>
							</p>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};
export default SignIn;
