import DesktopNavigation from "@/components/desktop-navigation";
import type { ReactNode } from "react";

const PublicLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="w-full">
			<DesktopNavigation />
			{children}
		</div>
	);
};
export default PublicLayout;
