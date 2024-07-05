import DeployButton from "../../components/DeployButton";
import AuthButton from "../../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import VehicleGrid from "./_components/vehicle-grid";
import { getRentals } from "@/lib/fetchers/rentals";
import HomePageHero from "./_components/home-page-hero";

export default async function Index() {

  const { error, rentals } = await getRentals();

  console.log(rentals);


  return (
			<div className="">
				<HomePageHero />
				<VehicleGrid />
			</div>
		);
}
