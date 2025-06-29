import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Contact } from "@/types";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { formatDateForInput } from "@/utils/date";
import { Button } from "./ui/button";
import { useSupabaseOperations } from "@/hooks/useSupabaseOperations";

interface ContactModalProps {
  currentContact: Contact | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ContactModal = ({ currentContact, isOpen, setIsOpen }: ContactModalProps) => {
  const isEditing = !!currentContact;
  const { insertData, updateData } = useSupabaseOperations();
  const [name, setName] = useState("");
  const [lastContactDate, setLastContactDate] = useState("");

  useEffect(() => {
    setName(currentContact?.name || "");
    setLastContactDate(formatDateForInput(currentContact?.last_contact_date || ""));
  }, [currentContact]);
  
  const handleSave = async () => {
    try {
      await insertData({
        name,
        last_contact_date: lastContactDate,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateData({
        id: currentContact?.id || "",
        name,
        last_contact_date: lastContactDate,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-full max-w-sm min-h-[400px] flex flex-col gap-4">
        <DialogHeader className="mb-4">
          <DialogTitle>{isEditing ? "Edit Contact" : "Add Contact"}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 h-full">
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="name">Contact Name</Label>
            <Input 
              id="name" 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="last_contact_date">Last Contact Date</Label>
            <Input
              id="last_contact_date"
              type="date"
              value={lastContactDate}
              onChange={(e) => setLastContactDate(e.target.value)}
              className="date-input"
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" />
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Button onClick={isEditing ? handleUpdate : handleSave}>Save</Button>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
