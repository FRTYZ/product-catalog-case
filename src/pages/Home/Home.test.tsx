import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

// React router dom
import { BrowserRouter as Router } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store from '../../redux/store';

// React Query
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';

// Component or pages
import Home from './Home';

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
            data: [],
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
            data: [],
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

        expect(screen.queryByPlaceholderText('Sıralama')).not.toBeInTheDocument();
    });

    test('Inputların render edilip edilmediğini kontrol etme', async () => {
        (useQuery as jest.Mock).mockReturnValue({
            isLoading: false,
            data: [],
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

        expect(screen.getByPlaceholderText('Ürün ismi ile ara')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Minimum')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Maximum')).toBeInTheDocument();
    });

    test('Kategori Select\'in render edilip edilmediğini kontrol etme', async () => {
        (useQuery as jest.Mock).mockReturnValue({
            isLoading: false,
            data: [],
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
        
        expect(screen.getByPlaceholderText('Kategoriler')).toBeInTheDocument();

    });

});
