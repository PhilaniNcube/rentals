import { createClient } from "@/utils/supabase/server";
import type { ReactNode } from "react";
import Link from "next/link";
import {
	Car,
	CircleUser,
	Clipboard,
	Home,
	HomeIcon,
	Menu,
	Package2,
	Plus,
	Search,
	Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import AddCarDialog from "./dashboard/cars/_components/add-car-dialog";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
	const supabase = createClient();

	const { data: isAdmin } = await supabase.rpc("is_admin").select("*");

	if (!isAdmin) {
		return <div>Unauthorized</div>;
	}

	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<div className="flex flex-col h-full max-h-screen gap-2">
					<div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
						<Link href="/" className="flex items-center gap-2 font-semibold">
							<Package2 className="w-6 h-6" />
							<span className="">Car Srvice</span>
						</Link>
					</div>
					<div className="flex-1">
						<nav className="grid items-start px-2 text-sm font-medium lg:px-4">
							<Link
								href="/dashboard"
								className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
							>
								<Home className="w-4 h-4" />
								Dashboard
							</Link>
							<Link
								href="/dashboard/cars"
								className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
							>
								<Car className="w-4 h-4" />
								Cars
							</Link>
							<Link
								href="/dashboard/bookings"
								className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
							>
								<Clipboard className="w-4 h-4" />
								Bookings
							</Link>
							<Link
								href="/dashboard/customers"
								className="flex items-center gap-3 px-3 py-2 transition-all rounded-lg text-muted-foreground hover:text-primary"
							>
								<Users className="w-4 h-4" />
								Customers
							</Link>
						</nav>
					</div>
				</div>
			</div>
			<div className="flex flex-col">
				<header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
					<Sheet>
						<SheetTrigger asChild>
							<Button
								variant="outline"
								size="icon"
								className="shrink-0 md:hidden"
							>
								<Menu className="w-5 h-5" />
								<span className="sr-only">Toggle navigation menu</span>
							</Button>
						</SheetTrigger>
						<SheetContent side="left" className="flex flex-col">
							<nav className="grid gap-2 text-lg font-medium">
								<Link
									href="/"
									className="flex items-center gap-2 text-lg font-semibold"
								>
									<HomeIcon className="w-6 h-6" />
									<span className="sr-only">Home</span>
								</Link>
								<Link
									href="/dashboard"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<Home className="w-5 h-5" />
									Dashboard
								</Link>
								<Link
									href="/dashboard/cars"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<Car className="w-5 h-5" />
									Cars
								</Link>
								<Link
									href="/dashboard/bookings"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<Clipboard className="w-5 h-5" />
									Bookings
								</Link>
								<Link
									href="/dashboard/customers"
									className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
								>
									<Users className="w-5 h-5" />
									Customers
								</Link>
							</nav>
						</SheetContent>
					</Sheet>
					<div className="flex-1 w-full">
					<AddCarDialog />
					</div>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="secondary" size="icon" className="rounded-full">
								<CircleUser className="w-5 h-5" />
								<span className="sr-only">Toggle user menu</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Logout</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</header>
				<main className="flex flex-col flex-1 gap-4 p-4 lg:gap-6 lg:p-6">
					<ScrollArea className="w-full h-[calc(100vh-110px)]">
						{children}
						<ScrollBar />
					</ScrollArea>
				</main>
			</div>
		</div>
	);
};
export default DashboardLayout;
