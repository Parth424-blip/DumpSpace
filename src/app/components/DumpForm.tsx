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

    await supabase.from("entries").insert({
      content,
      user_id: user.id,
    });

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
