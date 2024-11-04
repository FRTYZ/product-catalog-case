import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// React router dom
import { BrowserRouter as Router } from 'react-router-dom';

// Redux
import store from '../redux/store'; // Redux store'unuzun doğru yolu
import { Provider } from 'react-redux';

// Component or page
import Navbar from './Navbar'; // Navbar bileşeninin doğru yolu

describe('Navbar Component', () => {
    test('Navbar bileşeninin render olup olmadığını kontrol etme', () => {
        render(
            <Router>
                <Provider store={store}>
                    <Navbar />
                </Provider>
            </Router>
        );

        // Navbar bileşeninin içinde beklenen öğeleri kontrol edelim
        expect(screen.getByText('Ürün Kataloğu Case')).toBeInTheDocument();
        expect(screen.getByRole('img')).toHaveAttribute('src', 'https://yetisplus.com/images/brand_logo.png');
    });

    test('Sepet ikonunun render edilip edilmediğini kontrol etme', () => {
        render(
            <Router>
                <Provider store={store}>
                    <Navbar />
                </Provider>
            </Router>
        );

        // Sepet ikonunun render edildiğini kontrol et
        const cartIcon = screen.getByLabelText(/show/i);
        expect(cartIcon).toBeInTheDocument();
    });
});
