import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,      // 5 минут
      cacheTime: 30 * 60 * 1000,     // 30 минут
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/react-dpo">
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
