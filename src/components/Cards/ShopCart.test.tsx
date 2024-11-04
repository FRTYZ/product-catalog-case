import { render, screen, fireEvent } from '@testing-library/react';

// Redux
import { Provider } from 'react-redux';
import store, { setBagItems, deleteBagItem } from '../../redux/store';

// Component or pages
import ShopCard from './ShopCard';

describe('ShopCard Component', () => {
    beforeEach(() => {
        store.dispatch = jest.fn(); // dispatch fonksiyonunu mock'la
    });

    const bagItems = [
        {
            id: '1',
            title: 'Test Product',
            price: 100,
            amount: 1,
            image: 'image_url',
        },
    ];

    test('ShopCard içinde render edilip edilmediğini kontrol etme', () => {
        render(
            <Provider store={store}>
                <ShopCard bagItems={bagItems} />
            </Provider>
        );
    });
    test('Artırma butonuna tıklandığında setBagItems action\'ının dispatch edilip edilmediğini kontrol etme', () => {
        render(
            <Provider store={store}>
                <ShopCard bagItems={bagItems} />
            </Provider>
        );
    
        const addButton = screen.getByLabelText('increment');
        fireEvent.click(addButton); // Butona tıkla
    
        const expectedAction = setBagItems([{ id: '1', amount: 2 }]);
    
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction); // Beklenen action'ın dispatch edildiğini kontrol et
    });
    test('Azaltma butonuna tıklandığında deleteBagItem action\'ının dispatch edilip edilmediğini kontrol etme', () => {
        render(
            <Provider store={store}>
                <ShopCard bagItems={bagItems} />
            </Provider>
        );
    
        const removeButton = screen.getByLabelText('decrement');
        fireEvent.click(removeButton); 
    
        const expectedAction = deleteBagItem('1'); 
    
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction); // Beklenen deleteBagItem action'ın dispatch edildiğini kontrol et
    });
    test('Remove butonuna tıklandığında deleteBagItem action\'ının dispatch edilip edilmediğini kontrol etme', () => {
        const product = {
            id: '1',
            title: 'Test Product',
            price: 100,
            amount: 1,
            image: 'image_url',
        };
    
        const bagItems = [product];
    
        render(
            <Provider store={store}>
                <ShopCard bagItems={bagItems} />
            </Provider>
        );
    
        const removeButton = screen.getByLabelText('remove'); 
        fireEvent.click(removeButton);
    
        const expectedAction = deleteBagItem('1'); // Beklenen deleteBagItem action
    
        expect(store.dispatch).toHaveBeenCalledWith(expectedAction); // Beklenen deleteBagItem action'ın dispatch edildiğini kontrol et
    });
    
});
