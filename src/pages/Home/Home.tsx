import {useEffect, useState} from 'react';

// Components
import { XSelectBox } from '../../components/FormElements/XSelectBox';
import ProductCard from '../../components/Cards/ProductCard';

import { useQuery, useQueryClient } from 'react-query';

import { 
  Container,
  Box
 } from '@mui/material'

// Interfaces
export interface ProductsProps {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: number;
  images: string[],
}

function Home() {

  const { 
      data: products, 
      isLoading, 
      isError, 
      error
    } = useQuery<ProductsProps[]>(['products'], () => getProducts(), {
      staleTime: 1000 * 60 * 5,
      cacheTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: true,
      refetchInterval: false,
  });

  const getProducts = async () => {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();

      return data.products.reverse();
  }

  return (
    <Container>
        <Box>
            <XSelectBox 
                isFullWidth={false}
                selectItems={[
                  {
                    id: 'min_price',
                    value: 'Artan fiyat'
                  },
                  {
                    id: 'max_price',
                    value: 'Azalan fiyat'
                  }
                ]}
                sx={{ float: 'right' }}
            />
        </Box>
        {!isLoading && (
          <ProductCard data={products!} grid={[4,4,4,6]} />
        )}
    </Container>
  )
}

export default Home