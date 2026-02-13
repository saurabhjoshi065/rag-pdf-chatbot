import React, { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';

function UploadPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleUploadSuccess = (result) => {
    // Redirect to documents page after successful upload
    navigate('/documents');
  };

  const handleUploadError = (error) => {
    setError('Upload failed: ' + error.message);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Back to Home
        </Button>
        <Typography variant="h4" component="h1">
          Upload Documents
        </Typography>
        <Box sx={{ width: 100 }} /> {/* Spacer for alignment */}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      <FileUpload
        onUploadSuccess={handleUploadSuccess}
        onUploadError={handleUploadError}
      />

      <Box sx={{ mt: 2, textAlign: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          After uploading, you can view and manage your documents in the Document Management section.
        </Typography>
      </Box>
    </Container>
  );
}

export default UploadPage;