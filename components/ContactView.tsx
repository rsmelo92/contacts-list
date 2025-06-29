"use client";
import { Toaster } from "@/components/ui/sonner"
import { ScrollArea } from './ui/scroll-area'
import React, { useState } from 'react'
import { ContactCard } from './ContactCard'
import { Button } from './ui/button'
import { ContactModal } from './ContactModal'
import type { Contact } from '@/types'
import { EmptyState } from './EmptyState'
import { useContacts } from '@/hooks/useContacts'
import { Spinner } from './Spinner'
import { ErrorView } from './ErrorView'

export const ContactView = () => {
  const [currentContact, setCurrentContact] = useState<Contact | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const { data: contacts = [], isLoading, error } = useContacts();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorView error={error} />;

  return (
    <>
      <div className="flex flex-col items-center justify-center">
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
        onClose={() => {
          setCurrentContact(null);
          setIsOpen(false);
        }}
      />
      <Toaster expand />
    </>
  )
}
