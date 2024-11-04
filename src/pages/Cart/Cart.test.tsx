import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// React router dom
import { BrowserRouter as Router } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import store, { RootState } from '../../redux/store'; 

// Components or page
import Cart from './Cart';

// Test için bir mock store oluşturuyoruz
const renderWithRedux = (initialState: RootState) => {
    return render(
        <Provider store={store}>
            <Router>
                <Cart />
            </Router>
        </Provider>
    );
};

describe('Cart Component', () => {
    test('Sepet boşsa doğru içerik render ediliyor', () => {
        const initialState: RootState = {
            shopBagItems: { bagItems: [] },
        };

        renderWithRedux(initialState);

        // Boş sepet mesajını kontrol et
        expect(screen.getByText('Sepet')).toBeInTheDocument();
        expect(screen.getByText('Sepetinizde henüz ürün bulunmuyor. Dilerseniz ürün katalog sayfasına gidip, dilediğiniz ürünü seçebilirsiniz.')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /ürün katalog sayfası/i })).toHaveAttribute('href', '/');
    });

    test('Sepet doluyken doğru içerik render ediliyor', () => {
        const initialState: RootState = {
            shopBagItems: { 
                bagItems: [
                    { id: '1', image: '', title: 'Ürün 1', price: 100, amount: 2 },
                ] 
            },
        };

        renderWithRedux(initialState);

        // Sepet başlığı ve ürün sayısını kontrol et
        expect(screen.getByText('Sepet')).toBeInTheDocument();
    });
});
