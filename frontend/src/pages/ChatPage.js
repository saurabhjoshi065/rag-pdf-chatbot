import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  IconButton,
  AppBar,
  Toolbar,
  Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import { chatApi } from '../services/api';

function ChatPage() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your RAG chatbot. Upload some documents and ask me questions about them!",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputValue.trim() === '') return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError('');

    try {
      // Call the real API
      const response = await chatApi.sendMessage(inputValue);

      const botMessage = {
        id: messages.length + 2,
        text: response.data.answer,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        sources: response.data.sources
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to get response: ' + (err.response?.data?.detail || err.message || 'Unknown error'));

      // Add error message to chat
      const errorMessage = {
        id: messages.length + 2,
        text: 'Sorry, I encountered an error processing your request. Please try again.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar>
          <SmartToyIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            RAG Chatbot
          </Typography>
        </Toolbar>
      </AppBar>

      {error && (
        <Box sx={{ p: 2 }}>
          <Alert severity="error" onClose={() => setError('')}>
            {error}
          </Alert>
        </Box>
      )}

      <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
        <Container maxWidth="md">
          <Paper elevation={3} sx={{ p: 2, maxHeight: '70vh', overflow: 'auto' }}>
            <List>
              {messages.map((message) => (
                <React.Fragment key={message.id}>
                  <ListItem alignItems="flex-start">
                    <IconButton edge="start" sx={{ mr: 1 }}>
                      {message.sender === 'bot' ? (
                        <SmartToyIcon color="primary" />
                      ) : (
                        <PersonIcon color="secondary" />
                      )}
                    </IconButton>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle2">
                          {message.sender === 'bot' ? 'Assistant' : 'You'}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {message.text}
                          </Typography>
                          {message.sources && message.sources.length > 0 && (
                            <Box sx={{ mt: 1 }}>
                              <Typography variant="caption" color="text.secondary">
                                Sources:
                              </Typography>
                              <ul style={{ margin: '4px 0 0', paddingLeft: '20px' }}>
                                {message.sources.slice(0, 3).map((source, idx) => (
                                  <li key={idx}>
                                    <Typography variant="caption" color="text.secondary">
                                      {source.document} (Page {source.page})
                                    </Typography>
                                  </li>
                                ))}
                              </ul>
                            </Box>
                          )}
                          <Typography
                            component="span"
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block', mt: 1 }}
                          >
                            {message.timestamp}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
              {isLoading && (
                <ListItem>
                  <IconButton edge="start" sx={{ mr: 1 }}>
                    <SmartToyIcon color="primary" />
                  </IconButton>
                  <ListItemText
                    primary="Assistant"
                    secondary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <CircularProgress size={20} sx={{ mr: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          Thinking...
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
              )}
              <div ref={messagesEndRef} />
            </List>
          </Paper>
        </Container>
      </Box>

      <Box component="footer" sx={{ p: 2 }}>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton color="primary">
              <AttachFileIcon />
            </IconButton>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              variant="outlined"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              disabled={isLoading || inputValue.trim() === ''}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

export default ChatPage;