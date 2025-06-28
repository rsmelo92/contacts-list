import { createClient } from "@/utils/supabase/server";
import { ContactView } from "@/components/ContactView";
import type { Contact } from "@/types";

export default async function Home() {
  const supabase = await createClient();
  const { data: contacts } = await supabase.from("contacts").select();
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-blue-50">
      <ContactView contacts={contacts as Contact[]} />
    </main>
  );
}
