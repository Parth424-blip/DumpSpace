import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DumpForm from "@/app/components/DumpForm";

export default async function EditDumpPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    redirect("/login");
  }

  const { id } = await params;

  const { data: entry } = await supabase
    .from("entries")
    .select("id, content")
    .eq("id", id)
    .single();

  if (!entry) {
    return (
      <main className="flex-1 flex justify-center p-6 md:p-12">
        <div className="text-center text-neutral-400">Entry not found</div>
      </main>
    );
  }

  return (
    <main className="flex-1 flex bg-black">
      <DumpForm initialData={{ id: entry.id, content: entry.content }} />
    </main>
  );
}
