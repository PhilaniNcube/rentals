"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from 'next/link';
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MenuIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { logout } from "@/actions/auth/logout-action";


const MobileSlide = ({
	signedIn,
	admin,
}: { signedIn: boolean, admin: boolean | null }) => {
	const [open, setOpen] = useState(false);

	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger asChild>
				<Button type="button" variant="outline">
					<MenuIcon />
				</Button>
			</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            Menu
          </SheetTitle>
        </SheetHeader>
         <Separator className="my-1" />
        <div className="flex flex-col gap-y-4">
          <Link href="/" className="text-xl font-semibold">
            Home
          </Link>
          <Link href="/services" className="text-xl font-semibold">
            Services
          </Link>
          <Link href="/contact" className="text-xl font-semibold">
            Contact
          </Link>
          <form action={logout}>
          <Button className="" type="submit" variant="destructive">
            Logout <TrashIcon size="sm" className="ml-2" />
          </Button>
          </form>
        </div>
      </SheetContent>
		</Sheet>
	);
};
export default MobileSlide;
