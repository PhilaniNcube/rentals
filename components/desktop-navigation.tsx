import Link from "next/link";
import Login from "./login-dialog";
import SignUp from "./sign-up-dialog";
import { getCurrentUser, isAdmin } from "@/lib/fetchers/auth";
import AuthButton from "./AuthButton";
import { AccountMenu } from "./account-dropdown";

const DesktopNavigation = async () => {

  const adminData = isAdmin();

  const userData = getCurrentUser();

  const [user, admin] = await Promise.all([userData, adminData]);

  return (
			<header className="hidden w-full shadow-sm md:flex">
				<div className="container w-full py-2">
					<div className="flex items-center justify-between w-full">
						<Link href="/" className="font-medium text-slate-800">
							Car Service
						</Link>
						<nav className="flex items-center space-x-4">
							<Link href="/services">Services</Link>
							<Link href="/about">About</Link>
							<Link href="/contact">Contact</Link>
							{user ? (
								<>
									<AuthButton user={user} />
									<AccountMenu isAdmin={admin} />
								</>
							) : (
								<>
									<SignUp />
									<Login />
								</>
							)}
						</nav>
					</div>
				</div>
			</header>
		);
};
export default DesktopNavigation;
