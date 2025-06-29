"use client";
import { Toaster } from "@/components/ui/sonner"
import { ScrollArea } from './ui/scroll-area'
import React, { useState } from 'react'
import { ContactCard } from './ContactCard'
import { Button } from './ui/button'
import { ContactModal } from './ContactModal'
import type { Contact } from '@/types'
import { EmptyState } from './EmptyState'

interface ContactViewProps {
  contacts: Contact[];
}

export const ContactView = ({ contacts }: ContactViewProps) => {
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Contacts</h1>
        <ScrollArea className="h-[500px] max-w-[500px] md:w-[500px] sm:w-full flex flex-col gap-4 p-2">
          {contacts.length === 0 && <EmptyState />}
          {contacts?.map((contact: Contact) => (
            <ContactCard 
              key={contact.id} 
              contact={contact} 
              onClick={(contact: Contact) => {
                setCurrentContact(contact);
                setIsOpen(true);
              }}
            />
          ))}
        </ScrollArea>
        <Button 
          className="w-full" 
          size="lg" 
          onClick={() => {
            setCurrentContact(null);
            setIsOpen(true);
          }}
        >
          Add Contact
        </Button>
      </div>
      <ContactModal 
        currentContact={currentContact} 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
      />
      <Toaster expand />
    </>
  )
}
