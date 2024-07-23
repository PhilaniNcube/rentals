import DesktopNavigation from "@/components/desktop-navigation";
import MobileNavigation from "@/components/mobile-navigation";
import type { ReactNode } from "react";

const PublicLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div className="w-full">
			<DesktopNavigation />
      <MobileNavigation />
			{children}
		</div>
	);
};
export default PublicLayout;
