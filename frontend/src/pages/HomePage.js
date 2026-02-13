import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import ChatIcon from '@mui/icons-material/Chat';
import DescriptionIcon from '@mui/icons-material/Description';

function HomePage() {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload');
  };

  const handleViewDocumentsClick = () => {
    navigate('/documents');
  };

  const handleStartChatClick = () => {
    navigate('/chat');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          RAG Chatbot
        </Typography>
        <Typography variant="h5" color="text.secondary">
          Ask questions about your PDF documents with AI-powered retrieval
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <UploadIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
              <Typography variant="h5" component="h2" align="center" gutterBottom>
                Upload Documents
              </Typography>
              <Typography align="center">
                Upload your PDF documents to get started. Our system will process them
                and make them searchable.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
              <Button
                variant="contained"
                startIcon={<UploadIcon />}
                onClick={handleUploadClick}
              >
                Upload PDF
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <DescriptionIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
              <Typography variant="h5" component="h2" align="center" gutterBottom>
                Document Processing
              </Typography>
              <Typography align="center">
                Your documents are processed locally and stored securely. We use
                advanced embedding techniques for accurate retrieval.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
              <Button
                variant="outlined"
                onClick={handleViewDocumentsClick}
              >
                View Documents
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <ChatIcon sx={{ fontSize: 60, color: 'primary.main' }} />
              </Box>
              <Typography variant="h5" component="h2" align="center" gutterBottom>
                Start Chatting
              </Typography>
              <Typography align="center">
                Ask questions about your documents and get AI-powered answers based
                on their content. All processing happens locally.
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<ChatIcon />}
                onClick={handleStartChatClick}
              >
                Start Chat
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3, mt: 6 }}>
        <Typography variant="h6" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1"><strong>1. Upload</strong></Typography>
            <Typography>Upload your PDF documents to the system</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1"><strong>2. Process</strong></Typography>
            <Typography>Documents are chunked and embedded locally</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1"><strong>3. Chat</strong></Typography>
            <Typography>Ask questions and get answers from your documents</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default HomePage;