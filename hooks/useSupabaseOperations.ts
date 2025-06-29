import { supabase } from '@/utils/supabase/client';
import { v4 as uuidv4 } from 'uuid';
import type { Contact } from '@/types';

export const useSupabaseOperations = () => {
  const insertData = async (data: Contact, avatarData: File | null) => {
    if(!avatarData) { 
      throw new Error('No avatar data provided'); 
    }

    const fileName = `${uuidv4()}.${avatarData.name.split('.').pop()}`;

    const {
      data: uploadData, 
      error: uploadError 
    } = await supabase.storage.from('contact-images').upload(fileName, avatarData);
    
    if (uploadError || !uploadData) {
      console.error('Error uploading file:', uploadError);
      throw uploadError;
    }

    // Get the public URL of the uploaded image
    const { data: { publicUrl } } = supabase.storage.from('contact-images').getPublicUrl(fileName);

    const newContact = {
      ...data,
      avatar_url: publicUrl
    }

    const { data: insertedData, error } = await supabase.from('contacts').insert([newContact]).select();

    if (error) {
      console.error('Error inserting data:', error);
      throw error;
    }

    return insertedData;
  }

  const updateData = async (data: Contact) => {
    const { data: updatedData, error } = await supabase.from('contacts').update(data).eq('id', data.id).select();

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

    return deletedData;
  }
  return { insertData, updateData, deleteData };
}
