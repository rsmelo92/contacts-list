import { v4 as uuidv4 } from 'uuid';
import { SupabaseClient } from '@supabase/supabase-js';

export const extractFilePath = (url: string): string => {
  // Handle different URL formats from Supabase storage
  const patterns = [
    // Pattern for Supabase storage URLs: https://xxx.supabase.co/storage/v1/object/public/bucket-name/file-path
    /\/storage\/v1\/object\/public\/[^\/]+\/(.+)/,
    // Pattern for direct file paths
    /^([^\/]+\/.+)$/,
    // Pattern for just the filename
    /^([^\/]+)$/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return decodeURIComponent(match[1]);
  }

  // If no pattern matches, return the original URL
  return url;
};

export const uploadImage = async (file: File, storage: ReturnType<SupabaseClient['storage']['from']>) => {
  const fileName = `${uuidv4()}.${file.name.split('.').pop()}`;
  const { data, error } = await storage.upload(fileName, file);
  if (error) {
    console.error('Error uploading file:', error);
    throw error;
  }

  // Get the public URL of the uploaded image
  const { data: { publicUrl } } = storage.getPublicUrl(fileName);

  return {
    data,
    fileName,
    publicUrl
  };
}; 

export function getRandomColor() {
  const colors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF'];
  return colors[Math.floor(Math.random() * colors.length)];
}
