import { supabase } from '@/utils/supabase/client';
import type { Contact } from '@/types';
import { extractFilePath, uploadImage } from '@/utils/supabase/logic';

export const useSupabaseOperations = () => {
  const storage = supabase.storage.from('contact-images');
  
  const insertData = async (data: Contact, avatarData: File | null) => {
    if(!avatarData) { 
      throw new Error('No avatar data provided'); 
    }

    const { publicUrl } = await uploadImage(avatarData, storage);

    const newContact = {
      ...data,
      avatar_url: publicUrl
    }

    const { 
      data: insertedData, 
      error,
    } = await supabase.from('contacts').insert([newContact]).select();

    if (error) {
      console.error('Error inserting data:', error);
      throw error;
    }

    return insertedData;
  }

  const updateData = async (data: Contact, avatarData: File | null) => {
    const getAvatarUrl = async () => {
      if(!avatarData) {
        return data.avatar_url;
      }
      const { publicUrl } = await uploadImage(avatarData, storage);
      if(data.avatar_url && publicUrl) {
        const filePath = extractFilePath(data.avatar_url);
        const { error } = await storage.remove([filePath]);
        if(error) {
          console.error('Error deleting file:', error);
          throw error;
        }
      }
      return publicUrl;
    }

    const avatarUrl = await getAvatarUrl();

    const updatedContact = {
      ...data,
      avatar_url: avatarUrl
    };

    const { 
      data: updatedData, 
      error,
    } = await supabase.from('contacts').update(updatedContact).eq('id', data.id).select();

    if (error) {
      console.error('Error updating data:', error);
      throw error;
    }

    return updatedData;
  }

  const deleteData = async (id: string) => {
    const { data: deletedData, error } = await supabase.from('contacts').delete().eq('id', id).select();

    if (error) {
      console.error('Error deleting data:', error);
      throw error;
    }

    // Delete the avatar image from storage if it exists
    if(deletedData[0].avatar_url) {
      const filePath = extractFilePath(deletedData[0].avatar_url);
      await storage.remove([filePath]);
    }

    return deletedData;
  }
  return { insertData, updateData, deleteData };
}
