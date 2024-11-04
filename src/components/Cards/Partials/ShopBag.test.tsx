import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Redux
import store, { setBagItems } from '../../../redux/store'; // store'unuzun yolunu doğru belirtin
import { Provider } from 'react-redux';

// Component or pages
import ShopBag from './ShopBag'; // CartShopBag bileşeninin doğru yolu

describe('CartShopBag Component', () => {
    beforeEach(() => {
        store.dispatch = jest.fn();
    });

    test('ProductCard içinde render edilip edilmediğini kontrol etme', () => {
        const product = {
            id: 1,
            title: 'Test Product',
            price: 100,
            category: 'grocery',
            rating: 2.5,
            images: ['image_url'],
        };

        render(
            <Provider store={store}>
                <ShopBag itemProduct={product} />
            </Provider>
        );

        expect(screen.getByLabelText('add to shopping cart')).toBeInTheDocument(); // IconButton'ın render edildiğini kontrol et
    });

    test('Butona tıklandığında setBagItems action\'ının dispatch edilip edilmediğini kontrol etme', () => {
        const product = {
            id: 1,
            title: 'Test Product',
            price: 100,
            category: 'grocery',
            rating: 2.5,
            images: ['image_url'],
        };

        render(
            <Provider store={store}>
                <ShopBag itemProduct={product} />
            </Provider>
        );

        const addButton = screen.getByLabelText('add to shopping cart');
        fireEvent.click(addButton); // Butona tıkla

        const expectedAction = setBagItems([{
            id: product.id,
            image: product.images[0],
            title: product.title,
            price: product.price,
            amount: 1
        }]);

        expect(store.dispatch).toHaveBeenCalledWith(expectedAction); // Beklenen action'ın dispatch edildiğini kontrol et
    });
});
