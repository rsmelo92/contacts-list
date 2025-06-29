import { v4 as uuidv4 } from 'uuid';

export const extractFilePath = (url: string): string => {
  const match = url.match(/\/storage\/v1\/object\/public\/(.+)/);
  if (match) {
    return match[1].replace(/\/+/g, '/');
  }
  return url;
};

export const uploadImage = async (file: File, storage: any) => {
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
} 
