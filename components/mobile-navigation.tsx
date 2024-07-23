import MobileSlide from "@/app/(public)/_components/mobile-slide";
import { getCurrentUser, isAdmin } from "@/lib/fetchers/auth";
import Link from "next/link";

const MobileNavigation = async () => {

    const adminData = isAdmin();

				const userData = getCurrentUser();

				const [user, admin] = await Promise.all([userData, adminData]);

        const signedIn = !!user

				return (
					<header className="md:hidden">
						<div className="container flex items-center justify-between px-4 py-2">
							<Link className="font-semibold text-slate-800" href="/">
								AET
							</Link>
							<MobileSlide signedIn={signedIn} admin={admin} />
						</div>
					</header>
				);
};
export default MobileNavigation;
