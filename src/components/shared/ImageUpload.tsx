import React, { useState } from 'react';
import { Box, Button, Avatar, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { apiPost, apiUpload } from '../../api/apiClient'; // your API helper

type Props = {
  onUploadSuccess: (url: string) => void;
};

export default function ImageUpload({ onUploadSuccess }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview image locally
    setPreview(URL.createObjectURL(file));

    // upload to backend
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      const res = await apiUpload<{ url: string }>('/upload', formData);
        onUploadSuccess(res.url);

    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
      <Avatar src={preview || ''} sx={{ width: 80, height: 80 }} />
      <Button
        variant="contained"
        component="label"
        startIcon={<CloudUploadIcon />}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
        <input hidden accept="image/*" type="file" onChange={handleFileChange} />
      </Button>
      {preview && <Typography variant="body2">Preview above</Typography>}
    </Box>
  );
}
