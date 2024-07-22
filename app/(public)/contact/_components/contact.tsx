/**
 * v0 by Vercel.
 * @see https://v0.dev/t/D7mhegmRP4E
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Contact() {
	return (
		<section className="w-full py-12 ">
			<div className="container grid gap-12 px-4 md:px-6">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Get in Touch
						</h1>
						<p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							Have a question? Fill out the form below
							and we'll get back to you as soon as possible.
						</p>
					</div>
				</div>
				<Card className="w-full max-w-2xl p-4 mx-auto">
					<CardContent>
						<form className="grid gap-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="grid gap-2">
									<Label htmlFor="name">Name</Label>
									<Input id="name" placeholder="Enter your name" />
								</div>
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										type="email"
										placeholder="Enter your email"
									/>
								</div>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="subject">Subject</Label>
								<Input
									id="subject"
									placeholder="Briefly describe the reason for your message"
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="message">Message</Label>
								<Textarea
									id="message"
									placeholder="Write your message here"
									className="min-h-[150px]"
								/>
							</div>
							<Button type="submit" className="w-full">
								Submit
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
