import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DashboardClient from "@/app/components/DashboardClient";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    redirect("/login");
  }

  const { data: entries, error } = await supabase
    .from("entries")
    .select("id, ai_reflection, created_at, content")
    .eq("user_id", user.user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="flex-1 flex justify-center p-6 md:p-12">
      <DashboardClient initialEntries={entries || []} />
    </main>
  );
}
