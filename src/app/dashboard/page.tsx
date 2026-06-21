import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function DashboardPage() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    redirect("/login");
  }
  return (
    <>
      <h1>Past Entries</h1>
      <ol>
        <li></li>
        <li></li>
        <li></li>
      </ol>

      <button>New Dump</button>
    </>
  );
}

export default DashboardPage;
