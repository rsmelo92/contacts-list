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
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ConfirmationDialog } from "./ConfirmationDialog";

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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ name?: boolean; date?: boolean; avatar?: boolean }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [avatarData, setAvatarData] = useState<File | null>(null);

  useEffect(() => {
    setName(currentContact?.name || "");
    setLastContactDate(formatDateForInput(currentContact?.last_contact_date || ""));
    setImagePreview(currentContact?.avatar_url || null);
    setFieldErrors({}); // Clear errors when modal opens
  }, [currentContact]);
  
  const handleSave = async () => {
    // Clear previous errors
    setFieldErrors({});
    
    // Validate fields before saving
    const errors: { name?: boolean; date?: boolean; avatar?: boolean } = {};
    
    if (!name.trim()) {
      errors.name = true;
      toast.warning("Contact name is required");
    }
    if (!lastContactDate) {
      errors.date = true;
      toast.warning("Last contact date is required");
    }
    if (!avatarData) {
      errors.avatar = true;
      toast.warning("Contact picture is required");
    }
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      await insertData({
        name,
        last_contact_date: lastContactDate,
      }, avatarData);
      setIsOpen(false);
    } catch (error) {
      console.error("Error inserting data:", error);
      toast.warning("Failed to save contact. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    // Clear previous errors
    setFieldErrors({});
    
    // Validate fields before updating
    const errors: { name?: boolean; date?: boolean; avatar?: boolean } = {};
    
    if (!name.trim()) {
      errors.name = true;
      toast.warning("Contact name is required");
    }
    if (!lastContactDate) {
      errors.date = true;
      toast.warning("Last contact date is required");
    }
    if (!avatarData && !currentContact?.avatar_url) {
      errors.avatar = true;
      toast.warning("Contact picture is required");
    }
    
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      await updateData({
        id: currentContact?.id || "",
        name,
        last_contact_date: lastContactDate,
        avatar_url: currentContact?.avatar_url || "",
      }, avatarData);
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating data:", error);
      toast.warning("Failed to update contact. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteData(currentContact?.id || "");
      setIsOpen(false);
    } catch (error) {
      console.error("Error deleting data:", error);
      toast.warning("Failed to delete contact. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const clearFieldError = (field: 'name' | 'date' | 'avatar') => {
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
              disabled={isLoading}
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
              max={new Date().toISOString().split('T')[0]}
              disabled={isLoading}
            />
          </div>
          <div className="flex flex-row gap-6 items-end">
            <div className="grid w-full max-w-sm items-center gap-3">
              <Label htmlFor="picture">Picture</Label>
                <div className={`flex pr-3 flex-row gap-6 items-center p-2 border rounded-md ${fieldErrors.avatar ? "border-red-500" : "border-gray-200"}`}>
                  <Input 
                    id="picture" 
                    type="file" 
                    disabled={isLoading} 
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        console.log({file});
                        const imageUrl = URL.createObjectURL(file);
                        setImagePreview(imageUrl);
                        setAvatarData(file);
                        clearFieldError('avatar');
                      }
                    }}
                  />
                  <Avatar>
                    <AvatarImage 
                      className="object-cover rounded-full w-8 h-7" 
                      width={32} 
                      height={32} 
                      src={imagePreview || undefined} 
                    />
                    <AvatarFallback>
                      <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full">{name?.charAt(0)}</div>
                    </AvatarFallback>
                  </Avatar>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 justify-between">
          <div className="flex flex-row gap-2">
            <Button 
              onClick={isEditing ? handleUpdate : handleSave} 
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setIsOpen(false)} 
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
            {isEditing && (
              <ConfirmationDialog
                title="Delete contact"
                description="Are you sure you want to delete this contact?"
                onConfirm={handleDelete}
                trigger={
                  <Button variant="ghost" title="Delete contact" disabled={isLoading}>
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                }
              />
            )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
