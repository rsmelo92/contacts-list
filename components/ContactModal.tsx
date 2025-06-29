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
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

interface ContactModalProps {
  currentContact: Contact | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ContactModal = ({ currentContact, isOpen, setIsOpen }: ContactModalProps) => {
  const isEditing = !!currentContact;
  const { insertData, updateData, deleteData } = useSupabaseOperations();
  const [name, setName] = useState("");
  const [lastContactDate, setLastContactDate] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{ name?: boolean; date?: boolean }>({});

  useEffect(() => {
    setName(currentContact?.name || "");
    setLastContactDate(formatDateForInput(currentContact?.last_contact_date || ""));
    setFieldErrors({}); // Clear errors when modal opens
  }, [currentContact]);
  
  const handleSave = async () => {
    // Clear previous errors
    setFieldErrors({});
    
    // Validate fields before saving
    const errors: { name?: boolean; date?: boolean } = {};
    
    if (!name.trim()) {
      errors.name = true;
      toast.warning("Contact name is required");
    }
    if (!lastContactDate) {
      errors.date = true;
      toast.warning("Last contact date is required");
    }
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      await insertData({
        name,
        last_contact_date: lastContactDate,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error inserting data:", error);
      toast.warning("Failed to save contact. Please try again.");
    }
  };

  const handleUpdate = async () => {
    // Clear previous errors
    setFieldErrors({});
    
    // Validate fields before updating
    const errors: { name?: boolean; date?: boolean } = {};
    
    if (!name.trim()) {
      errors.name = true;
      toast.warning("Contact name is required");
    }
    if (!lastContactDate) {
      errors.date = true;
      toast.warning("Last contact date is required");
    }
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    try {
      await updateData({
        id: currentContact?.id || "",
        name,
        last_contact_date: lastContactDate,
      });
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating data:", error);
      toast.warning("Failed to update contact. Please try again.");
    }
  };

  const clearFieldError = (field: 'name' | 'date') => {
    setFieldErrors(prev => ({ ...prev, [field]: false }));
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
              onFocus={() => clearFieldError('name')}
              className={fieldErrors.name ? "border-red-500 focus:border-red-500" : ""}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="last_contact_date">Last Contact Date</Label>
            <Input
              id="last_contact_date"
              type="date"
              value={lastContactDate}
              onChange={(e) => setLastContactDate(e.target.value)}
              className={`date-input ${fieldErrors.date ? "border-red-500 focus:border-red-500" : ""}`}
              onFocus={() => clearFieldError('date')}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-3">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" />
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-between">
          <div className="flex flex-row gap-2">
            <Button onClick={isEditing ? handleUpdate : handleSave}>Save</Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          </div>
            {isEditing && (
              <Button 
                variant="ghost" 
                onClick={() => deleteData(currentContact?.id || "")}
                title="Delete contact"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </Button>
            )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
