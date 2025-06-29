"use client";
import { ContactView } from "@/components/ContactView";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-blue-50">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-2xl font-bold mb-4">Contacts</h1>
        <ContactView />
      </div>
    </main>
  );
}
