import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function DashboardPage() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    redirect("/login");
  }

  const { data: entries, error: err2 } = await supabase
    .from("entries")
    .select("id, ai_reflection, created_at, content")
    .eq("user_id", user.user.id)
    .order("created_at", { ascending: false });
  return (
    <>
      <h1>Past Entries</h1>
      {entries?.map((entry) => (
        <li key={entry.id}>
          <p>{entry.content}</p>
          <p>{entry.ai_reflection}</p>
          <p>{entry.created_at}</p>
        </li>
      ))}

      <button>New Dump</button>
    </>
  );
}

export default DashboardPage;
