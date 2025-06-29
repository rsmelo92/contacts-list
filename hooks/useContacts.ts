import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";
import type { Contact } from "@/types";
import { extractFilePath, uploadImage } from "@/utils/supabase/logic";

export const useContacts = () => {
  const fetchContacts = async (): Promise<Contact[]> => {
    const { data, error } = await supabase
      .from("contacts")
      .select()
      .order("last_contact_date", { ascending: false });
  
    if (error) {
      throw new Error(`Failed to fetch contacts: ${error.message}`);
    }
  
    return data || [];
  };

  return useQuery({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  const storage = supabase.storage.from("contact-images");

  return useMutation({
    mutationFn: async ({ data, avatarData }: { data: Contact; avatarData: File | null }) => {
      if (!avatarData) {
        throw new Error("No avatar data provided");
      }

      const { publicUrl } = await uploadImage(avatarData, storage);

      const newContact = {
        ...data,
        avatar_url: publicUrl,
      };

      const { data: insertedData, error } = await supabase
        .from("contacts")
        .insert([newContact])
        .select();

      if (error) {
        throw new Error(`Failed to create contact: ${error.message}`);
      }

      return insertedData[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  const storage = supabase.storage.from("contact-images");

  return useMutation({
    mutationFn: async ({ data, avatarData }: { data: Contact; avatarData: File | null }) => {
      const getAvatarUrl = async () => {
        if (!avatarData) {
          return data.avatar_url;
        }
        
        const { publicUrl } = await uploadImage(avatarData, storage);
        
        // Delete the old image if it exists
        if (data.avatar_url && publicUrl) {
          try {
            const filePath = extractFilePath(data.avatar_url);
            const { error: removeError } = await storage.remove([filePath]);
            if (removeError) {
              console.error("Error deleting old file:", removeError);
            }
          } catch (error) {
            console.error("Error in file deletion process:", error);
          }
        }
        
        return publicUrl;
      };

      const avatarUrl = await getAvatarUrl();

      const updatedContact = {
        ...data,
        avatar_url: avatarUrl,
      };

      const { data: updatedData, error } = await supabase
        .from("contacts")
        .update(updatedContact)
        .eq("id", data.id)
        .select();

      if (error) {
        throw new Error(`Failed to update contact: ${error.message}`);
      }

      return updatedData[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  const storage = supabase.storage.from("contact-images");

  return useMutation({
    mutationFn: async (id: string) => {
      const { data: deletedData, error } = await supabase
        .from("contacts")
        .delete()
        .eq("id", id)
        .select();

      if (error) {
        throw new Error(`Failed to delete contact: ${error.message}`);
      }

      // Delete the avatar image from storage if it exists
      if (deletedData[0].avatar_url) {
        try {
          const filePath = extractFilePath(deletedData[0].avatar_url);
          const { error: removeError } = await storage.remove([filePath]);
          if (removeError) {
            console.error("Error deleting file from storage:", removeError);
          }
        } catch (error) {
          console.error("Error in file deletion process:", error);
        }
      }

      return deletedData[0];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}; 
