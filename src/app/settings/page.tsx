import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/app/components/ui/Button";

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user.user) {
    redirect("/login");
  }

  return (
    <main className="flex-1 flex justify-center p-6 md:p-12 animate-in fade-in duration-500">
      <div className="w-full max-w-2xl space-y-12">
        <header className="border-b border-neutral-800 pb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-white">Settings</h1>
          <p className="text-sm text-neutral-400 mt-1">Manage your account and preferences.</p>
        </header>

        <section className="space-y-6">
          <h2 className="text-xl font-medium text-white">Account Information</h2>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 space-y-4">
            <div>
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Email Address</label>
              <div className="text-sm text-white">{user.user.email}</div>
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-500 uppercase tracking-wider mb-1">Account ID</label>
              <div className="text-xs text-neutral-400 font-mono break-all">{user.user.id}</div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-xl font-medium text-white">Appearance</h2>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 space-y-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium text-white">Theme</div>
              <div className="text-sm text-neutral-400">DumpSpace is currently available in Dark Mode only.</div>
            </div>
            <div className="px-4 py-1.5 bg-neutral-800 text-neutral-300 rounded-full text-xs font-medium border border-neutral-700">Dark</div>
          </div>
        </section>

        <section className="space-y-6 pt-6 border-t border-neutral-800">
          <h2 className="text-xl font-medium text-red-500">Danger Zone</h2>
          <div className="rounded-2xl border border-red-900/30 bg-red-950/10 p-6 space-y-4">
            <div>
              <div className="text-sm font-medium text-white">Delete Account</div>
              <div className="text-sm text-neutral-400 mt-1">Permanently delete your account and all journaling data. This action cannot be undone.</div>
            </div>
            <Button variant="danger" disabled title="Feature coming soon">Delete Account</Button>
          </div>
        </section>
      </div>
    </main>
  );
}
