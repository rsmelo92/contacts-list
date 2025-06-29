import { extractFilePath, uploadImage, getRandomColor } from '../supabase';
import type { SupabaseClient } from '@supabase/supabase-js';

describe('extractFilePath', () => {
  it('should extract file path from Supabase storage URL', () => {
    const url = 'https://xxx.supabase.co/storage/v1/object/public/bucket-name/folder/file.png';
    expect(extractFilePath(url)).toBe('folder/file.png');
  });

  it('should extract file path from direct file path', () => {
    const url = 'bucket-name/folder/file.png';
    expect(extractFilePath(url)).toBe('bucket-name/folder/file.png');
  });

  it('should extract file path from just the filename', () => {
    const url = 'file.png';
    expect(extractFilePath(url)).toBe('file.png');
  });

  it('should decode URL-encoded file paths', () => {
    const url = 'https://xxx.supabase.co/storage/v1/object/public/bucket-name/folder%20name/file%20name.png';
    expect(extractFilePath(url)).toBe('folder name/file name.png');
  });

  it('should return the original URL if no pattern matches', () => {
    const url = 'https://example.com/other/path/file.png';
    expect(extractFilePath(url)).toBe(url);
  });
});

describe('uploadImage', () => {
  it('should upload an image and return data, fileName, and publicUrl', async () => {
    // Mock File
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });

    // Mock Supabase storage
    const uploadMock = jest.fn().mockResolvedValue({ data: 'uploadData', error: null });
    const getPublicUrlMock = jest.fn().mockReturnValue({ data: { publicUrl: 'https://public.url/test.png' } });
    const storage = { 
      upload: uploadMock, 
      getPublicUrl: getPublicUrlMock 
    } as unknown as ReturnType<SupabaseClient['storage']['from']>;

    const result = await uploadImage(file, storage);

    expect(uploadMock).toHaveBeenCalled();
    expect(getPublicUrlMock).toHaveBeenCalled();
    expect(result).toHaveProperty('data', 'uploadData');
    expect(result).toHaveProperty('fileName');
    expect(result).toHaveProperty('publicUrl', 'https://public.url/test.png');
    expect(result.fileName.endsWith('.png')).toBe(true);
  });

  it('should throw and log error if upload fails', async () => {
    // Mock console.error to avoid console.error being called on test run
    console.error = jest.fn();
    // Mock File
    const file = new File(['dummy content'], 'test.png', { type: 'image/png' });
    // Mock Supabase storage with error
    const uploadMock = jest.fn().mockResolvedValue({ data: null, error: new Error('Upload failed') });
    const getPublicUrlMock = jest.fn();
    const storage = { 
      upload: uploadMock, 
      getPublicUrl: getPublicUrlMock 
    } as unknown as ReturnType<SupabaseClient['storage']['from']>;

    await expect(uploadImage(file, storage)).rejects.toThrow('Upload failed');
  });
});

describe('getRandomColor', () => {
  it('should always return a specific color (this test will fail)', () => {
    // This test is designed to fail because getRandomColor returns random colors
    // and we're expecting it to always return a specific color
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    const color3 = getRandomColor();
    
    // This assertion will fail because the function returns random colors
    expect(color1).toBe(color2);
    expect(color2).toBe(color3);
    expect(color1).toBe('#FF5733'); // Expecting a specific color, but it's random
  });
}); 
