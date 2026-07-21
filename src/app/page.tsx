import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();

  if (user?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-black">
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-500">
        <div className="max-w-3xl space-y-8 mt-12 sm:mt-24">
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white">
            Clear your mind.
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            DumpSpace is a minimal, AI-powered journaling app. Pour your thoughts out and get insightful, objective reflections.
          </p>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-medium text-black transition-transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              Start Journaling
            </Link>
            <Link 
              href="/login"
              className="inline-flex items-center justify-center rounded-full bg-transparent border border-neutral-700 px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            >
              Sign In
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-32 pt-12 border-t border-neutral-800">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Unclutter</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Dump everything on your mind into a beautiful, distraction-free interface built for speed.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Reflect</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Our AI analyzes your entries and provides thoughtful, objective reflections to help you grow.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Organize</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Look back at past thoughts, search instantly, and track your personal journey effortlessly.</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl w-full text-left mt-32 mb-24">
          <h2 className="text-2xl font-semibold text-white mb-8 border-b border-neutral-800 pb-4">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Is DumpSpace free to use?</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Yes, DumpSpace is currently completely free to use while we are in early beta.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">How does the AI reflection work?</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">When you save a journal entry, we securely process your text through an LLM to generate an objective, thoughtful summary and reflection. Your data is not used for training.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">Can I export my data?</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">Data export functionality is currently on our roadmap. You retain full ownership of your journal entries.</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="py-8 flex items-center justify-center border-t border-neutral-900 text-xs text-neutral-600">
        &copy; {new Date().getFullYear()} DumpSpace. All rights reserved.
      </footer>
    </div>
  );
}
