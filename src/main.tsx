import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './index.css'

import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux';

import theme from './theme.tsx';
import store from './redux/store.tsx';

import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.Fragment>
     <ThemeProvider theme={theme}>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                  <App />
              </BrowserRouter>
            </QueryClientProvider>
        </Provider>
    </ThemeProvider>
  </React.Fragment>,
)
