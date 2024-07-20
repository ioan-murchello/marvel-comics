import React from 'react'
import './index.css'
import { createRoot } from 'react-dom/client';
import App from './components/app/App'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <QueryClientProvider client={client}>
    <App />
  </QueryClientProvider>
);
