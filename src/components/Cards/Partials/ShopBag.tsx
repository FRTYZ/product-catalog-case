import React from 'react'

import { useAppDispatch, setBagItems } from '../../../redux/store';

import { ProductsProps } from '../../../pages/Home/Home';

// Material UI and İcons
import { 
    IconButton,
    } from '@mui/material';

// Material UI Icons
import { AddShoppingCart as AddShoppingCartIcon} from '@mui/icons-material';


interface CartShopBagProps {
    itemProduct: ProductsProps
}

function CartShopBag({
    itemProduct
}: CartShopBagProps) {

    const dispatch = useAppDispatch();

    const handleAddItemToBag = () => {
        const bagItems = [{
            id: itemProduct.id,
            image: itemProduct.images[0],
            title: itemProduct.title,
            price: itemProduct.price,
            amount: 1
        }];

        dispatch(setBagItems(bagItems))
    }

    return (
        <IconButton 
            color="primary" 
            aria-label="add to shopping cart"
            onClick={() => handleAddItemToBag()}
        >
            <AddShoppingCartIcon />
        </IconButton>
    )
}

export default CartShopBag