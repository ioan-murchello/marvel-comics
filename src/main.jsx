import React from 'react'
import './index.css'
import { createRoot } from 'react-dom/client';
import App from './components/app/App'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const client = new QueryClient({
  defaultOptions: {queries: {retry: 3, retryDelay: 1000,}}
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <QueryClientProvider client={client}>
    <App /> 
  </QueryClientProvider>
);
