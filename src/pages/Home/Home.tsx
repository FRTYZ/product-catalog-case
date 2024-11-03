import {useEffect, useState} from 'react';

// Components
import XSelectBox from '../../components/FormElements/XSelectBox';
import XInput from '../../components/FormElements/XInput';
import XButton from '../../components/FormElements/XButton';

import ProductCard from '../../components/Cards/ProductCard';

import { useQuery, useQueryClient } from 'react-query';

import Swal from 'sweetalert2';

import { useFormik } from 'formik';

import { 
  Container,
  Grid2 as Grid,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails
 } from '@mui/material';

 import {
  ExpandMore, 
  Remove
} from '@mui/icons-material';

// Interfaces
export interface ProductsProps {
  id: number;
  title: string;
  price: number;
  category: string;
  rating: number;
  images: string[],
}

import { SelectItemTypes } from '../../components/FormElements/XSelectBox';

function Home() {

  const [categories, setCategories] = useState<SelectItemTypes[]>([]);

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

  useEffect(() => {
    if(products && products.length > 0){
        const categorySet = new Set<string>();

        products.forEach(product => {
            if (product.category) {
                categorySet.add(product.category);
            }
        });

        // Set'i array'e dönüştürme

        const uniqueCategories = Array.from(categorySet).map(category => ({
          id: category,
          value: category.toUpperCase()
        }));

        setCategories(uniqueCategories)
    }
  }, [products])


  const initialValues: {minPrice: string, maxPrice: string, selectCategory: string} = {
    minPrice: '',
    maxPrice: '',
    selectCategory: '0'
  }
  const formik = useFormik({
      enableReinitialize: true,
      initialValues,
      onSubmit: async (values) => {
          const {minPrice, maxPrice, selectCategory} = values;

          if(minPrice){
              if(minPrice || maxPrice){
                  /* setPrice({minPrice, maxPrice}) */
              }
          }
          else{
              await Swal.fire({
                  position: "center",
                  icon: "error",
                  title: "You should determine a price range.",
                  showConfirmButton: false,
                  timer: 1500
              });
          }
      }
  })


  return (
    <Container>
      <Grid container>
          <Grid size={{ xs: 12, lg: 4 }}>
              <Typography
                sx={{
                   marginInline: '30px',
                   fontSize: '24px',
                   fontWeight: 500
                }}
              >
                Ürünlerimiz
              </Typography>
              <form 
                  method='POST'
                  onSubmit={formik.handleSubmit}
              >
                <Box 
                  sx={{ 
                    display: 'grid',
                    marginTop: '30px', 
                    gridGap: '30px',
                    marginInline: '30px'
                  }}
                >
                  <Box>
                      <Typography>Kategoriler</Typography>
                      <XSelectBox 
                        isFullWidth={true}
                        name="selectCategory"
                        value={formik.values.selectCategory}
                        selectItems={categories}
                        handleChange={formik.handleChange}
                    />
                  </Box>
                  <Box>
                      <Typography>Fiyat Aralığı</Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center'
                        }}
                      >
                        <XInput 
                            type='number'
                            label=""
                            name="minPrice"
                            placeholder='Minimum'
                            value={formik.values.minPrice}
                            handleChange={formik.handleChange}
                            size="small"
                        />
                        <Typography sx={{
                            textAlign: 'center', 
                            marginInline: '10px'
                        }}>
                            -
                        </Typography>
                        <XInput 
                            type='number'
                            label=""
                            name="maxPrice"
                            placeholder='Maximum'
                            value={formik.values.maxPrice}
                            handleChange={formik.handleChange}
                            size="small"
                        />
                      </Box>
                  </Box>
                  <XButton 
                    text='Ara' 
                    type="submit" 
                    variant="contained" 
                    sx={{ backgroundColor: '#17a77f' }}
                  />
                </Box>
              </form>
          </Grid>
          <Grid size={{ xs: 12, lg: 8 }}>
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
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home