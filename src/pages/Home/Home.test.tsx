import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Home from './Home';

import store from '../../redux/store';

const queryClient = new QueryClient();

jest.mock('react-query', () => {
    return {
        ...jest.requireActual('react-query'),
        useQuery: jest.fn(),
    };
});

describe('Home Page', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Home sayfasının render olup olmadığı', async () => {
        (useQuery as jest.Mock).mockReturnValue({
            isLoading: false,
            data: [], // gerekli veriler
            error: null,
        });

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

    test('Select\'in render edilip edilmediğini kontrol etme', async () => {
        (useQuery as jest.Mock).mockReturnValue({
            isLoading: false,
            data: [], // gerekli veriler
            error: null,
        });

        render(
            <Router>
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <Home />
                    </QueryClientProvider>
                </Provider>
            </Router>
        );

        expect(screen.getByPlaceholderText('Sıralama')).toBeInTheDocument();
    });

    test('Yükleme durumunda Select\'in render edilmediğini kontrol etme', async () => {
        (useQuery as jest.Mock).mockReturnValue({
            isLoading: true,
            data: null,
            error: null,
        });

        render(
            <Router>
                <Provider store={store}>
                    <QueryClientProvider client={queryClient}>
                        <Home />
                    </QueryClientProvider>
                </Provider>
            </Router>
        );

        expect(screen.queryByPlaceholderText('Sıralama')).not.toBeInTheDocument(); // İlk başta yok
    });
});
