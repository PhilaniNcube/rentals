import { createClient } from "@/utils/supabase/server";

export async function getCurrentUser() {
  const supabase = createClient();

  const {data:{user}} = await supabase.auth.getUser();

  return user;
}


export async function isAdmin() {
  const supabase = createClient();

  const { data: isAdmin } = await supabase.rpc("is_admin");

  return isAdmin;
}
