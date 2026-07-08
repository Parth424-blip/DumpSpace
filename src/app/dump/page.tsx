import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import DumpForm from "@/app/components/DumpForm";

async function DumpPage() {
  const supabase = await createClient();
  const { data: user } = await supabase.auth.getUser();
  if (!user.user) {
    redirect("/login");
  }

  return (
    <>
      <DumpForm />
    </>
  );
}

export default DumpPage;
