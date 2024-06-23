import DeployButton from "../../components/DeployButton";
import AuthButton from "../../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import VehicleGrid from "./_components/vehicle-grid";

export default async function Index() {


  return (
    <div className="py-8">
     <VehicleGrid />
    </div>
  );
}
