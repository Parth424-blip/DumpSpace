import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { UserDropdown } from "./UserDropdown";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-neutral-800 bg-black/80 backdrop-blur-md">
      <div className="flex h-16 items-center px-6 md:px-12 max-w-5xl mx-auto justify-between">
        <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2 font-semibold text-white tracking-tight hover:opacity-80 transition-opacity">
          DumpSpace
        </Link>
        {user ? (
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors hidden sm:block">
              Dashboard
            </Link>
            <Link href="/dump" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors hidden sm:block">
              New Dump
            </Link>
            <UserDropdown email={user.email} />
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
