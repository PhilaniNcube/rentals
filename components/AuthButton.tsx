import { logout } from "@/actions/auth/logout-action";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export default async function AuthButton({user}:{user:any}) {




  return (
			<div className="flex items-center gap-4">

				<form action={logout}>
					<Button
            variant="destructive"
            size="sm"
						type="submit"
						className="px-4 py-2 no-underline rounded-md"
					>
						Logout
					</Button>
				</form>
			</div>
		);
}
