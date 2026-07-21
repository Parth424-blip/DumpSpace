import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatRelativeDate } from "@/lib/utils/date";

export default async function ViewEntryPage({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    redirect("/login");
  }

  const { id } = await params;

  const { data: entry } = await supabase
    .from("entries")
    .select("*")
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
    <main className="flex-1 flex justify-center p-6 md:p-12">
      <div className="w-full max-w-3xl space-y-8">
        <header className="flex items-center justify-between mb-8 pb-8 border-b border-neutral-800">
          <Link 
            href="/dashboard" 
            className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
          >
            &larr; Back to Dashboard
          </Link>
          <Link
            href={`/dump/edit/${entry.id}`}
            className="text-xs font-medium bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white px-3 py-1.5 rounded-full hover:bg-neutral-800 transition-colors"
          >
            Edit Entry
          </Link>
        </header>

        <article className="space-y-12">
          <div>
            <div className="text-sm text-neutral-500 mb-4 font-medium">
              Created {formatRelativeDate(entry.created_at)}
            </div>
            <p className="text-lg leading-relaxed text-neutral-200 whitespace-pre-wrap">
              {entry.content}
            </p>
          </div>

          {entry.ai_reflection && (
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                AI Reflection
              </h3>
              <p className="text-base leading-relaxed text-neutral-400 whitespace-pre-wrap">
                {entry.ai_reflection}
              </p>
            </div>
          )}
        </article>
      </div>
    </main>
  );
}
