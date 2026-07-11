"use client";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DumpForm() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data: entry } = await supabase
      .from("entries")
      .insert({ content, user_id: user.id })
      .select()
      .single();
    console.log("entry:", entry);

    const response = await fetch("/api/reflect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const { reflection } = await response.json();
    console.log("reflection:", reflection);

    const updateResult = await supabase
      .from("entries")
      .update({ ai_reflection: reflection })
      .eq("id", entry.id);

    console.log("update result:", updateResult);

    router.push("/dashboard");
  }

  return (
    <div>
      <h1>Brain Dump</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind..."
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Saving..." : "Dump"}
      </button>
    </div>
  );
}
