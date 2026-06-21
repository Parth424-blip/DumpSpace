"use client";

import { createClient } from "@/lib/supabase/client";

async function signInWithGoogle() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
}
function LoginPage() {
  return (
    <div>
      <h1>LoginPage</h1>
      <button onClick={() => signInWithGoogle()}>Login With Google</button>
    </div>
  );
}

export default LoginPage;
