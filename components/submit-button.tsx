"use client";

import type { ReactNode } from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

const SubmitButton = ({
	className,
	children,
}: { className?: string; children: ReactNode }) => {
	const { pending } = useFormStatus();

	return (
		<Button type="submit" className={cn("", className)}>
			{pending ? "Submitting..." : children}
		</Button>
	);
};
export default SubmitButton;
