import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import './global.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './app';


// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        <ToastContainer />
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
