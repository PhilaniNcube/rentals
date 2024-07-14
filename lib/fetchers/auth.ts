import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const getCurrentUser = cache(async() => {
  const supabase = createClient();

  const {data:{user}} = await supabase.auth.getUser();

  return user;
})


export async function isAdmin() {
  const supabase = createClient();

  const { data: isAdmin } = await supabase.rpc("is_admin");

  return isAdmin;
}
