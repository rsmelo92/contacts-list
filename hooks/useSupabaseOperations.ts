import { supabase } from '@/utils/supabase/client';
import type { Contact } from '@/types';

export const useSupabaseOperations = () => {
  const insertData = async (data: Contact) => {
    const { data: insertedData, error } = await supabase.from('contacts').insert([data]).select();

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
