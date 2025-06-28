import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/date";
import type { Contact } from "@/types";

const ContactCard = ({ contact }: { contact: Contact }) => {
  return (
    <Card className="my-2 cursor-pointer hover:bg-cyan-50">
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={contact.avatar_url} />
            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-row gap-1 justify-between">
            <p>{contact.name}</p>
            <p>{formatDate(contact.last_contact_date)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default async function Home() {
  const supabase = await createClient();
  const { data: contacts } = await supabase.from("contacts").select();
  console.log(contacts);
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-blue-50">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Contacts</h1>
        <ScrollArea className="h-[500px] w-[500px] flex flex-col gap-4">
          {contacts?.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </ScrollArea>
        <Button className="w-full" size="lg">Add Contact</Button>
      </div>
    </main>
  );
}
