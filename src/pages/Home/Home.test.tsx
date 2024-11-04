import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../redux/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import Home from './Home';

const queryClient = new QueryClient();

describe('Home Page', () => {
    test('Home sayfasının render olup olmadığı', async () => {
        await act(async () => {
            render(
                <Router>
                    <Provider store={store}>
                        <QueryClientProvider client={queryClient}>
                            <Home />
                        </QueryClientProvider>
                    </Provider>
                </Router>
            );
        });
    });
});
