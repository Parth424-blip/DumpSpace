"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useToast } from "./Toast";
import { Button } from "./ui/Button";

export default function DumpForm({ initialData }: { initialData?: { id: string; content: string } }) {
  const router = useRouter();
  const [content, setContent] = useState(initialData?.content || "");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleSubmit() {
    if (!content.trim()) return;
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    if (initialData) {
      // Edit mode
      const { error } = await supabase
        .from("entries")
        .update({ content })
        .eq("id", initialData.id)
        .eq("user_id", user.id);

      if (error) {
        toast("Failed to update entry", "error");
        setLoading(false);
        return;
      }
      toast("Entry updated successfully", "success");
      router.refresh();
      router.push("/dashboard");
    } else {
      // Create mode
      const { data: entry, error: insertError } = await supabase
        .from("entries")
        .insert({ content, user_id: user.id })
        .select()
        .single();
      
      if (insertError) {
        toast("Failed to save entry", "error");
        setLoading(false);
        return;
      }

      toast("Generating reflection...", "info");

      try {
        const response = await fetch("/api/reflect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        });
        const { reflection } = await response.json();

        await supabase
          .from("entries")
          .update({ ai_reflection: reflection })
          .eq("id", entry.id)
          .eq("user_id", user.id);

        toast("Entry created successfully", "success");
      } catch (err) {
        toast("Failed to generate reflection", "error");
      }

      router.refresh();
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex flex-col h-full max-w-3xl w-full mx-auto p-6 md:p-12 animate-in fade-in duration-500">
      <header className="flex items-center justify-between mb-8">
        <Link 
          href="/dashboard" 
          className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
        >
          &larr; Back to Dashboard
        </Link>
      </header>
      
      <div className="flex-1 flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-white mb-2">
            {initialData ? "Edit Brain Dump" : "New Brain Dump"}
          </h1>
          <p className="text-sm text-neutral-400">
            {initialData ? "Update your thoughts. AI reflection will be preserved." : "Pour your thoughts out. The AI will reflect on them."}
          </p>
        </div>

        <div className="flex-1 flex flex-col min-h-[300px] relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind? Just start typing..."
            className="flex-1 w-full resize-none rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 text-lg text-white placeholder-neutral-600 focus:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-700 transition-colors"
            aria-label="Journal entry content"
          />
          <div className="absolute bottom-6 right-6 text-xs text-neutral-500 font-mono" aria-live="polite">
            {content.length} chars
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button 
            onClick={handleSubmit} 
            disabled={!content.trim()}
            isLoading={loading}
            className="px-8"
          >
            {initialData ? "Save Changes" : "Save Dump"}
          </Button>
        </div>
      </div>
    </div>
  );
}
