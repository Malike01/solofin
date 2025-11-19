
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react'
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store/store';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
<React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
         <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
)
