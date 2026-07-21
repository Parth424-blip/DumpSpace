"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { formatRelativeDate } from "@/lib/utils/date";
import { useToast } from "./Toast";
import { createClient } from "@/lib/supabase/client";
import { EntryCard } from "./EntryCard";
import { EmptyState } from "./ui/EmptyState";
import { ConfirmDialog } from "./ui/ConfirmDialog";

export type Entry = {
  id: string;
  ai_reflection: string | null;
  created_at: string;
  content: string;
};

export default function DashboardClient({
  initialEntries,
}: {
  initialEntries: Entry[];
}) {
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    id: string | null;
  }>({ isOpen: false, id: null });

  useEffect(() => {
    setEntries(initialEntries);
  }, [initialEntries]);

  const { toast } = useToast();
  const supabase = createClient();
  const router = useRouter();

  const filteredAndSortedEntries = useMemo(() => {
    let result = entries.filter((entry) => {
      const q = search.toLowerCase();
      return (
        entry.content.toLowerCase().includes(q) ||
        (entry.ai_reflection && entry.ai_reflection.toLowerCase().includes(q))
      );
    });

    result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [entries, search, sortOrder]);

  const requestDelete = (id: string) => {
    setConfirmDialog({ isOpen: true, id });
  };

  const handleConfirmDelete = async () => {
    const id = confirmDialog.id;
    if (!id) return;

    setDeletingId(id);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      toast("Authentication required", "error");
      setDeletingId(null);
      setConfirmDialog({ isOpen: false, id: null });
      return;
    }

    const { error } = await supabase
      .from("entries")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      toast("Failed to delete entry", "error");
      setDeletingId(null);
      setConfirmDialog({ isOpen: false, id: null });
      return;
    }

    setEntries((prev) => prev.filter((e) => e.id !== id));
    toast("Entry deleted successfully", "success");
    setDeletingId(null);
    setConfirmDialog({ isOpen: false, id: null });

    router.refresh();
  };

  const hasEntries = entries.length > 0;

  return (
    <div className="w-full max-w-3xl space-y-8 animate-in fade-in duration-500">
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title="Delete Entry"
        description="Are you sure you want to delete this journal entry? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDialog({ isOpen: false, id: null })}
        isConfirming={!!deletingId}
      />

      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-neutral-800">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Past Entries
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            {entries.length} {entries.length === 1 ? "entry" : "entries"} total
            {entries.length > 0 && (
              <span>
                {" "}
                &middot; Last updated{" "}
                {formatRelativeDate(entries[0].created_at)}
              </span>
            )}
          </p>
        </div>
        <Link
          href="/dump"
          className="inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
        >
          New Dump
        </Link>
      </header>

      {!hasEntries ? (
        <EmptyState
          title="No entries yet"
          description="Your space is empty. Start by creating your first brain dump to get AI reflections."
          actionText="Create first dump"
          actionHref="/dump"
        />
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-neutral-900/40 p-4 rounded-xl border border-neutral-800">
            <input
              type="text"
              placeholder="Search entries and reflections..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:max-w-xs bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors"
              aria-label="Search entries"
            />
            <select
              value={sortOrder}
              onChange={(e) =>
                setSortOrder(e.target.value as "newest" | "oldest")
              }
              className="w-full sm:w-auto bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500 transition-colors"
              aria-label="Sort entries"
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>

          <div className="space-y-6">
            {filteredAndSortedEntries.length === 0 ? (
              <div className="text-center py-12 text-neutral-500 text-sm">
                No entries match your search.
              </div>
            ) : (
              filteredAndSortedEntries.map((entry) => (
                <EntryCard
                  key={entry.id}
                  entry={entry}
                  onDeleteClick={requestDelete}
                  isDeleting={deletingId === entry.id}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
