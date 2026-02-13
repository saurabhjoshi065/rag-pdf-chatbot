import axios from 'axios';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 30000,
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // You can add authentication headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // Network error
      console.error('Network Error:', error.request);
    } else {
      // Request setup error
      console.error('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Document API functions
export const documentApi = {
  uploadDocument: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  listDocuments: () => {
    return apiClient.get('/documents/list');
  },

  deleteDocument: (documentId) => {
    return apiClient.delete(`/documents/${documentId}`);
  },
};

// Chat API functions
export const chatApi = {
  sendMessage: (query, documentIds = null) => {
    return apiClient.post('/chat', {
      query,
      document_ids: documentIds,
    });
  },

  getChatHistory: (sessionId) => {
    return apiClient.get(`/chat/history/${sessionId}`);
  },
};

// Health check
export const healthApi = {
  checkHealth: () => {
    return apiClient.get('/health');
  },
};

export default apiClient;