"use client";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { formatDate } from "@/utils/date";
import type { Contact } from "@/types";

interface ContactCardProps {
  contact: Contact;
  onClick: (contact: Contact) => void;
}

export const ContactCard = ({ contact, onClick }: ContactCardProps) => {
  return (
    <Card 
      className="my-2 cursor-pointer relative overflow-clip transition-all duration-200 ease-out hover:shadow-lg hover:shadow-blue-200/50 hover:border-blue-300/50 w-full"
      onClick={() => {
        onClick(contact);
      }}
    >
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={contact.avatar_url} />
            <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 flex-row gap-1 justify-between">
            <p className="truncate flex-1 max-w-[80px] md:max-w-full">{contact.name}</p>
            <p>{formatDate(contact.last_contact_date)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
